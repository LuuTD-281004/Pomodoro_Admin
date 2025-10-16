"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, ImageIcon, Check, Trash2 } from "lucide-react";
import {
  createAvatar,
  deleteAvatar,
  getAllAvatars,
  getAvatars,
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

interface Avatar {
  id: string;
  filePath: string;
  stars: number;
  name: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AvatarsPage() {
  const [cloudinaryFiles, setCloudinaryFiles] = useState<CloudinaryFile[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<CloudinaryFile | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [stars, setStars] = useState<number>(0);
  const [avatarName, setAvatarName] = useState<string>("");

  const fetchCloudinaryFiles = async () => {
    try {
      setLoading(true);
      const response = await getAvatars();
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

  const fetchAvatars = async () => {
    try {
      const response = await getAllAvatars();
      setAvatars(response.result || []);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      // Mock data for demonstration
      setAvatars([]);
    }
  };

  useEffect(() => {
    fetchAvatars();
  }, []);

  const handleCreateAvatar = async () => {
    if (!selectedFile) return;

    try {
      const response = await createAvatar(
        avatarName,
        selectedFile.secure_url,
        isPremium,
        stars
      );
      setAvatars([...avatars, response.data.result]);
      setSelectedFile(null);
      setIsPremium(false);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating avatar:", error);
    }
  };

  const handleDeleteAvatar = async (id: string) => {
    try {
      const response = await deleteAvatar(id);
      if (response) {
        setAvatars(avatars.filter((avatar) => avatar.id !== id));
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
            Avatar Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage avatar files from Cloudinary and create avatar entities
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Avatar
        </Button>
      </div>

      {/* Create Avatar Form */}
      {showCreateForm && (
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            Create New Avatar Entity
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="search" className="text-card-foreground">
                Search Cloudinary Files
              </Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search avatar files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-input"
                />
              </div>
            </div>

            <div>
              <Label className="text-card-foreground mb-3 block">
                Select Avatar File
              </Label>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading files...
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto p-2">
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
                        className="w-full aspect-square object-cover"
                      />
                      {selectedFile?.asset_id === file.asset_id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="bg-primary rounded-full p-1">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-white truncate opacity-0 group-hover:opacity-100 transition-opacity">
                        {file.display_name}
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="premium" className="text-card-foreground">
                      Premium Avatar
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Mark this avatar as premium content
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
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={avatarName}
                    onChange={(e) => setAvatarName(e.target.value)}
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
                  <Button onClick={handleCreateAvatar} className="flex-1">
                    Create Avatar Entity
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

      {/* Existing Avatars */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">
          Existing Avatar Entities
        </h2>

        {avatars && avatars.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No avatar entities created yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first avatar entity to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {avatars.map &&
              avatars.map((avatar) => (
                <Card
                  key={avatar.id}
                  className="overflow-hidden bg-card border-border"
                >
                  <div className="aspect-square relative">
                    <img
                      src={avatar.filePath || "/placeholder.svg"}
                      alt={`Avatar ${avatar.id}`}
                      className="w-full h-full object-cover"
                    />
                    {avatar.isPremium && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-xs text-muted-foreground">
                      <p>ID: {avatar.id.substring(0, 8)}...</p>
                      <p>
                        Created:{" "}
                        {new Date(avatar.createdAt).toLocaleDateString()}
                      </p>
                      <p>Stars: {avatar.stars}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAvatar(avatar.id)}
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
          Cloudinary Files ({cloudinaryFiles.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
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
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-xs text-center px-2">
                    {file.display_name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
