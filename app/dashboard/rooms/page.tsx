"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Users, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Room {
  id: string
  name: string
  type: string
  capacity: number
  currentOccupancy: number
  status: "available" | "occupied" | "maintenance" | "reserved"
  location: string
  price: number
  description: string
  createdDate: string
}

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [rooms] = useState<Room[]>([
    {
      id: "1",
      name: "Conference Room A",
      type: "Meeting Room",
      capacity: 12,
      currentOccupancy: 8,
      status: "occupied",
      location: "Floor 2, East Wing",
      price: 50,
      description: "Large conference room with projector and whiteboard",
      createdDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Study Room 101",
      type: "Study Room",
      capacity: 4,
      currentOccupancy: 0,
      status: "available",
      location: "Floor 1, Library",
      price: 15,
      description: "Quiet study room perfect for small groups",
      createdDate: "2024-01-20",
    },
    {
      id: "3",
      name: "Auditorium",
      type: "Event Space",
      capacity: 200,
      currentOccupancy: 0,
      status: "maintenance",
      location: "Ground Floor",
      price: 200,
      description: "Large auditorium for presentations and events",
      createdDate: "2024-01-10",
    },
    {
      id: "4",
      name: "Workshop Room B",
      type: "Workshop",
      capacity: 20,
      currentOccupancy: 0,
      status: "reserved",
      location: "Floor 3, West Wing",
      price: 75,
      description: "Hands-on workshop room with tools and equipment",
      createdDate: "2024-02-01",
    },
    {
      id: "5",
      name: "Private Office 205",
      type: "Office",
      capacity: 2,
      currentOccupancy: 1,
      status: "occupied",
      location: "Floor 2, North Wing",
      price: 30,
      description: "Private office space for focused work",
      createdDate: "2024-02-15",
    },
  ])

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: Room["status"]) => {
    const variants = {
      available: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      occupied: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      maintenance: "bg-destructive/20 text-destructive border-destructive/30",
      reserved: "bg-chart-1/20 text-chart-1 border-chart-1/30",
    }
    return variants[status]
  }

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Rooms</CardTitle>
            <MapPin className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{rooms.length}</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Available</CardTitle>
            <div className="h-4 w-4 rounded-full bg-chart-3"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {rooms.filter((r) => r.status === "available").length}
            </div>
            <p className="text-xs text-muted-foreground">Ready for booking</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Occupied</CardTitle>
            <div className="h-4 w-4 rounded-full bg-chart-4"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {rooms.filter((r) => r.status === "occupied").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {rooms.reduce((sum, room) => sum + room.capacity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Maximum occupancy</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">Room Management</CardTitle>
              <CardDescription className="text-muted-foreground">Manage room availability and bookings</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Room
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-card-foreground">Add New Room</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Create a new room with the specified details and configuration.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="room-name" className="text-right text-card-foreground">
                      Name
                    </Label>
                    <Input
                      id="room-name"
                      placeholder="Enter room name"
                      className="col-span-3 bg-background border-border"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="room-type" className="text-right text-card-foreground">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-background border-border">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting Room</SelectItem>
                        <SelectItem value="study">Study Room</SelectItem>
                        <SelectItem value="event">Event Space</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right text-card-foreground">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="Maximum occupancy"
                      className="col-span-3 bg-background border-border"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right text-card-foreground">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="Floor and wing details"
                      className="col-span-3 bg-background border-border"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right text-card-foreground">
                      Price/Hour
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Hourly rate"
                      className="col-span-3 bg-background border-border"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right text-card-foreground">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Room features and amenities"
                      className="col-span-3 bg-background border-border"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create Room
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>

          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-muted-foreground">Room</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Capacity</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Price/Hour</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium text-card-foreground">{room.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {room.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-border text-card-foreground">
                        {room.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-card-foreground">
                          {room.currentOccupancy}/{room.capacity}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({getOccupancyPercentage(room.currentOccupancy, room.capacity)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(room.status)}>
                        {room.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-card-foreground">${room.price}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-card-foreground"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem className="text-card-foreground hover:bg-muted">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-card-foreground hover:bg-muted">
                            <Users className="mr-2 h-4 w-4" />
                            View Bookings
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
