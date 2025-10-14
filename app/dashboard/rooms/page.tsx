"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GroupRoom, PersonalRoom } from "@/types/room";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [personalSortBy, setPersonalSortBy] = useState("createdAt")
  const [personalOrder, setPersonalOrder] = useState<"ASC" | "DESC">("DESC")

  const [personalPage, setPersonalPage] = useState(1)
  const [personalPagination, setPersonalPagination] = useState({
    total: 23,
    page: 1,
    limit: 10,
    totalPages: 3,
  })

  const [groupSortBy, setGroupSortBy] = useState("createdAt")
  const [groupOrder, setGroupOrder] = useState<"ASC" | "DESC">("DESC")

  const [groupPage, setGroupPage] = useState(1)
  const [groupPagination, setGroupPagination] = useState({
    total: 18,
    page: 1,
    limit: 10,
    totalPages: 2,
  })

  const [personalRooms] = useState<PersonalRoom[]>([
    {
      id: "1",
      roomStatus: 1,
      focusTime: 25,
      userId: "user-123",
      loopCount: 4,
      shortRestTime: 5,
      longRestTime: 15,
      endAt: null,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      roomStatus: 2,
      focusTime: 50,
      userId: "user-456",
      loopCount: 3,
      shortRestTime: 10,
      longRestTime: 20,
      endAt: "2024-03-20T15:30:00Z",
      createdAt: "2024-01-20T14:00:00Z",
      updatedAt: "2024-01-20T14:00:00Z",
    },
    {
      id: "3",
      roomStatus: 0,
      focusTime: 30,
      userId: "user-789",
      loopCount: 5,
      shortRestTime: 5,
      longRestTime: 15,
      endAt: null,
      createdAt: "2024-02-01T09:00:00Z",
      updatedAt: "2024-02-01T09:00:00Z",
    },
  ])

  const [groupRooms] = useState<GroupRoom[]>([
    {
      id: "1",
      roomType: 1,
      roomStatus: 1,
      loopCount: 4,
      roomName: "Study Group A",
      focusTime: 25,
      shortRestTime: 5,
      longRestTime: 15,
      roomCode: "STUDY123",
      endAt: null,
      participantCount: 8,
      messageCount: 45,
      createdAt: new Date("2024-01-15T10:00:00Z"),
      updatedAt: new Date("2024-01-15T10:00:00Z"),
    },
    {
      id: "2",
      roomType: 2,
      roomStatus: 2,
      loopCount: 3,
      roomName: "Team Focus Room",
      focusTime: 50,
      shortRestTime: 10,
      longRestTime: 20,
      roomCode: "TEAM456",
      endAt: new Date("2024-03-20T15:30:00Z"),
      participantCount: 12,
      messageCount: 89,
      createdAt: new Date("2024-01-20T14:00:00Z"),
      updatedAt: new Date("2024-01-20T14:00:00Z"),
    },
    {
      id: "3",
      roomType: 1,
      roomStatus: 0,
      loopCount: 5,
      roomName: "Productivity Hub",
      focusTime: 30,
      shortRestTime: 5,
      longRestTime: 15,
      roomCode: "PROD789",
      endAt: null,
      participantCount: 5,
      messageCount: 23,
      createdAt: new Date("2024-02-01T09:00:00Z"),
      updatedAt: new Date("2024-02-01T09:00:00Z"),
    },
  ])

  const filteredPersonalRooms = personalRooms.filter(
    (room) =>
      room.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredGroupRooms = groupRooms.filter(
    (room) =>
      room.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.roomCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePersonalSort = (column: string) => {
    if (personalSortBy === column) {
      // Toggle order if same column
      setPersonalOrder(personalOrder === "ASC" ? "DESC" : "ASC")
    } else {
      // Set new column and default to ASC
      setPersonalSortBy(column)
      setPersonalOrder("ASC")
    }
    // TODO: Fetch data from backend with new sort parameters
    // Example: fetchPersonalRooms({ page: personalPage, limit: personalLimit, sortBy: column, order: newOrder })
  }

  const handleGroupSort = (column: string) => {
    if (groupSortBy === column) {
      // Toggle order if same column
      setGroupOrder(groupOrder === "ASC" ? "DESC" : "ASC")
    } else {
      // Set new column and default to ASC
      setGroupSortBy(column)
      setGroupOrder("ASC")
    }
    // TODO: Fetch data from backend with new sort parameters
    // Example: fetchGroupRooms({ page: groupPage, limit: groupLimit, sortBy: column, order: newOrder })
  }

  const handlePersonalPageChange = (newPage: number) => {
    setPersonalPage(newPage)
    // TODO: Fetch data from backend with new page
    // Example: fetchPersonalRooms({ page: newPage, limit: personalLimit, search: searchTerm, sortBy: personalSortBy, order: personalOrder })
  }

  const handleGroupPageChange = (newPage: number) => {
    setGroupPage(newPage)
    // TODO: Fetch data from backend with new page
    // Example: fetchGroupRooms({ page: newPage, limit: groupLimit, search: searchTerm, sortBy: groupSortBy, order: groupOrder })
  }

  const getRoomStatusBadge = (status: number) => {
    const statusMap = {
      0: { label: "Idle", class: "bg-muted/20 text-muted-foreground border-muted" },
      1: { label: "Active", class: "bg-chart-3/20 text-chart-3 border-chart-3/30" },
      2: { label: "Completed", class: "bg-chart-1/20 text-chart-1 border-chart-1/30" },
    }
    return statusMap[status as keyof typeof statusMap] || statusMap[0]
  }

  const getRoomTypeBadge = (type: number) => {
    const typeMap = {
      1: { label: "Focus", class: "bg-chart-2/20 text-chart-2 border-chart-2/30" },
      2: { label: "Collaboration", class: "bg-chart-4/20 text-chart-4 border-chart-4/30" },
    }
    return typeMap[type as keyof typeof typeMap] || typeMap[1]
  }

  const formatDate = (date: string | Date | null) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderSortIcon = (column: string, currentSortBy: string, currentOrder: "ASC" | "DESC") => {
    if (column !== currentSortBy) {
      return <ArrowUpDown className="ml-1 h-3 w-3 inline" />
    }
    return currentOrder === "ASC" ? (
      <ArrowUp className="ml-1 h-3 w-3 inline" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3 inline" />
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Personal Rooms</CardTitle>
            <User className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{personalRooms.length}</div>
            <p className="text-xs text-muted-foreground">Individual focus sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Group Rooms</CardTitle>
            <Users className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{groupRooms.length}</div>
            <p className="text-xs text-muted-foreground">Collaborative sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Active Rooms</CardTitle>
            <div className="h-4 w-4 rounded-full bg-chart-3"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {personalRooms.filter((r) => r.roomStatus === 1).length +
                groupRooms.filter((r) => r.roomStatus === 1).length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {groupRooms.reduce((sum, room) => sum + room.participantCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">In group rooms</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Room Management</CardTitle>
          <CardDescription className="text-muted-foreground">Manage personal and group focus rooms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="personal">Personal Rooms</TabsTrigger>
              <TabsTrigger value="group">Group Rooms</TabsTrigger>
            </TabsList>

            {/* Personal Rooms Tab */}
            <TabsContent value="personal" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by user ID..."
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
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handlePersonalSort("id")}
                      >
                        Room ID {renderSortIcon("id", personalSortBy, personalOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handlePersonalSort("userId")}
                      >
                        User ID {renderSortIcon("userId", personalSortBy, personalOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handlePersonalSort("focusTime")}
                      >
                        Focus Time {renderSortIcon("focusTime", personalSortBy, personalOrder)}
                      </TableHead>
                      <TableHead className="text-muted-foreground">Rest Times</TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handlePersonalSort("loopCount")}
                      >
                        Loops {renderSortIcon("loopCount", personalSortBy, personalOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handlePersonalSort("roomStatus")}
                      >
                        Status {renderSortIcon("roomStatus", personalSortBy, personalOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handlePersonalSort("endAt")}
                      >
                        End At {renderSortIcon("endAt", personalSortBy, personalOrder)}
                      </TableHead>
                      <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPersonalRooms.map((room) => {
                      const status = getRoomStatusBadge(room.roomStatus)
                      return (
                        <TableRow key={room.id} className="border-border hover:bg-muted/50">
                          <TableCell className="font-medium text-card-foreground">{room.id}</TableCell>
                          <TableCell className="text-card-foreground">{room.userId}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-card-foreground">{room.focusTime}m</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-card-foreground">
                            {room.shortRestTime}m / {room.longRestTime}m
                          </TableCell>
                          <TableCell className="text-card-foreground">{room.loopCount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={status.class}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-card-foreground text-sm">{formatDate(room.endAt)}</TableCell>
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
                                <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="text-sm text-muted-foreground">
                  Showing {(personalPagination.page - 1) * personalPagination.limit + 1} to{" "}
                  {Math.min(personalPagination.page * personalPagination.limit, personalPagination.total)} of{" "}
                  {personalPagination.total} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePersonalPageChange(personalPage - 1)}
                    disabled={personalPage === 1}
                    className="border-border"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: personalPagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === personalPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePersonalPageChange(page)}
                        className={page === personalPage ? "bg-primary text-primary-foreground" : "border-border"}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePersonalPageChange(personalPage + 1)}
                    disabled={personalPage === personalPagination.totalPages}
                    className="border-border"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Group Rooms Tab */}
            <TabsContent value="group" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or code..."
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
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handleGroupSort("roomName")}
                      >
                        Room Name {renderSortIcon("roomName", groupSortBy, groupOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handleGroupSort("roomCode")}
                      >
                        Code {renderSortIcon("roomCode", groupSortBy, groupOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handleGroupSort("roomType")}
                      >
                        Type {renderSortIcon("roomType", groupSortBy, groupOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handleGroupSort("focusTime")}
                      >
                        Focus Time {renderSortIcon("focusTime", groupSortBy, groupOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handleGroupSort("participantCount")}
                      >
                        Participants {renderSortIcon("participantCount", groupSortBy, groupOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handleGroupSort("messageCount")}
                      >
                        Messages {renderSortIcon("messageCount", groupSortBy, groupOrder)}
                      </TableHead>
                      <TableHead
                        className="text-muted-foreground cursor-pointer hover:text-card-foreground"
                        onClick={() => handleGroupSort("roomStatus")}
                      >
                        Status {renderSortIcon("roomStatus", groupSortBy, groupOrder)}
                      </TableHead>
                      <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGroupRooms.map((room) => {
                      const status = getRoomStatusBadge(room.roomStatus)
                      const type = getRoomTypeBadge(room.roomType)
                      return (
                        <TableRow key={room.id} className="border-border hover:bg-muted/50">
                          <TableCell className="font-medium text-card-foreground">{room.roomName}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-border text-card-foreground font-mono">
                              {room.roomCode}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={type.class}>
                              {type.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-card-foreground">{room.focusTime}m</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-card-foreground">{room.participantCount}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-card-foreground">{room.messageCount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={status.class}>
                              {status.label}
                            </Badge>
                          </TableCell>
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
                                  View Participants
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="text-sm text-muted-foreground">
                  Showing {(groupPagination.page - 1) * groupPagination.limit + 1} to{" "}
                  {Math.min(groupPagination.page * groupPagination.limit, groupPagination.total)} of{" "}
                  {groupPagination.total} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGroupPageChange(groupPage - 1)}
                    disabled={groupPage === 1}
                    className="border-border"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: groupPagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === groupPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleGroupPageChange(page)}
                        className={page === groupPage ? "bg-primary text-primary-foreground" : "border-border"}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGroupPageChange(groupPage + 1)}
                    disabled={groupPage === groupPagination.totalPages}
                    className="border-border"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
