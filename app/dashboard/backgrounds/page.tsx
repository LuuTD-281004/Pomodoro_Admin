"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, ImageIcon, Check, Trash2 } from "lucide-react";
import axios from "axios";
import {
  createBackground,
  deleteBackground,
  getAllBackgrounds,
  getBackgrounds,
} from "@/axios/files";

interface CloudinaryFile {
  asset_id: string;
  public_id: string;
  format: string;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

interface Background {
  id: string;
  filePath: string;
  stars: number;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BackgroundsPage() {
  const [cloudinaryFiles, setCloudinaryFiles] = useState<CloudinaryFile[]>([]);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<CloudinaryFile | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [stars, setStars] = useState<number>(0);

  const fetchCloudinaryFiles = async () => {
    try {
      setLoading(true);
      const response = await getBackgrounds();
      setCloudinaryFiles(response.files);
    } catch (error) {
      console.error("Error fetching Cloudinary files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCloudinaryFiles();
  }, []);

  const fetchBackgrounds = async () => {
    try {
      const response = await getAllBackgrounds();
      setBackgrounds(response.result || []);
    } catch (error) {
      console.error("Error fetching backgrounds:", error);
      setBackgrounds([]);
    }
  };

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const handleCreateBackground = async () => {
    if (!selectedFile) return;

    try {
      const response = await createBackground(
        selectedFile.secure_url,
        isPremium,
        stars
      );
      setBackgrounds([...backgrounds, response.data.result]);
      setSelectedFile(null);
      setIsPremium(false);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating avatar:", error);
    }
  };

  const handleDeleteBackground = async (id: string) => {
    try {
      const response = await deleteBackground(id);
      if (response) {
        setBackgrounds(
          backgrounds.filter((background) => background.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  };

  const filteredFiles = cloudinaryFiles.filter((file) =>
    file.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Background Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage background files from Cloudinary and create background
            entities (WebP format)
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Background
        </Button>
      </div>

      {/* Create Background Form */}
      {showCreateForm && (
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            Create New Background Entity
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="search" className="text-card-foreground">
                Search Cloudinary Files (WebP only)
              </Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search background files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-input"
                />
              </div>
            </div>

            <div>
              <Label className="text-card-foreground mb-3 block">
                Select Background File
              </Label>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading files...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
                  {filteredFiles.map((file) => (
                    <button
                      key={file.asset_id}
                      onClick={() => setSelectedFile(file)}
                      className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                        selectedFile?.asset_id === file.asset_id
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={file.secure_url || "/placeholder.svg"}
                        alt={file.display_name}
                        className="w-full aspect-video object-cover"
                      />
                      {selectedFile?.asset_id === file.asset_id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="bg-primary rounded-full p-2">
                            <Check className="h-5 w-5 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-sm text-white">
                        <p className="font-medium truncate">
                          {file.display_name}
                        </p>
                        <p className="text-xs text-gray-300">
                          {file.width}x{file.height} •{" "}
                          {file.format.toUpperCase()}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedFile && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label className="text-card-foreground">Selected File</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedFile.display_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFile.secure_url}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dimensions: {selectedFile.width}x{selectedFile.height} •
                    Format: {selectedFile.format.toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="premium" className="text-card-foreground">
                      Premium Background
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Mark this background as premium content
                    </p>
                  </div>
                  <Switch
                    id="premium"
                    checked={isPremium}
                    onCheckedChange={setIsPremium}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="price" className="text-card-foreground">
                    Stars
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    placeholder="Enter stars"
                    value={stars}
                    onChange={(e) => setStars(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Set a price for this avatar
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreateBackground} className="flex-1">
                    Create Background
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setIsPremium(false);
                      setShowCreateForm(false);
                      setStars(0);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Existing Backgrounds */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">
          Existing Background Entities
        </h2>

        {backgrounds && backgrounds.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No background entities created yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first background entity to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backgrounds.map &&
              backgrounds.map((background) => (
                <Card
                  key={background.id}
                  className="overflow-hidden bg-card border-border"
                >
                  <div className="aspect-video relative">
                    <img
                      src={background.filePath || "/placeholder.svg"}
                      alt={`Background ${background.id}`}
                      className="w-full h-full object-cover"
                    />
                    {background.isPremium && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-xs text-muted-foreground">
                      <p>ID: {background.id.substring(0, 8)}...</p>
                      <p>
                        Created:{" "}
                        {new Date(background.createdAt).toLocaleDateString()}
                      </p>
                      <p>Stars: {background.stars}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteBackground(background.id)}
                      className="w-full gap-2"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </Card>

      {/* Cloudinary Files Overview */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">
          Cloudinary Files ({cloudinaryFiles.length} WebP backgrounds)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {cloudinaryFiles &&
            cloudinaryFiles.map &&
            cloudinaryFiles.map((file) => (
              <div
                key={file.asset_id}
                className="group relative rounded-lg overflow-hidden border border-border"
              >
                <img
                  src={file.secure_url || "/placeholder.svg"}
                  alt={file.display_name}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center px-3">
                    <p className="text-sm font-medium">{file.display_name}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      {file.width}x{file.height}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
