"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter, CreditCard, TrendingUp, DollarSign, Calendar } from "lucide-react"

interface Transaction {
  id: string
  userId: string
  userName: string
  type: "booking" | "refund" | "payment" | "subscription"
  amount: number
  status: "completed" | "pending" | "failed" | "refunded"
  description: string
  date: string
  paymentMethod: string
  roomId?: string
  roomName?: string
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      userId: "1",
      userName: "John Doe",
      type: "booking",
      amount: 150.0,
      status: "completed",
      description: "Conference Room A - 3 hours",
      date: "2024-03-15T10:30:00Z",
      paymentMethod: "Credit Card",
      roomId: "1",
      roomName: "Conference Room A",
    },
    {
      id: "TXN002",
      userId: "2",
      userName: "Jane Smith",
      type: "subscription",
      amount: 29.99,
      status: "completed",
      description: "Monthly Premium Plan",
      date: "2024-03-14T09:15:00Z",
      paymentMethod: "PayPal",
    },
    {
      id: "TXN003",
      userId: "3",
      userName: "Mike Johnson",
      type: "booking",
      amount: 75.0,
      status: "pending",
      description: "Workshop Room B - 1 hour",
      date: "2024-03-14T14:20:00Z",
      paymentMethod: "Credit Card",
      roomId: "4",
      roomName: "Workshop Room B",
    },
    {
      id: "TXN004",
      userId: "4",
      userName: "Sarah Wilson",
      type: "refund",
      amount: -45.0,
      status: "completed",
      description: "Cancelled booking refund",
      date: "2024-03-13T16:45:00Z",
      paymentMethod: "Credit Card",
    },
    {
      id: "TXN005",
      userId: "5",
      userName: "David Brown",
      type: "booking",
      amount: 30.0,
      status: "failed",
      description: "Study Room 101 - 2 hours",
      date: "2024-03-13T11:30:00Z",
      paymentMethod: "Debit Card",
      roomId: "2",
      roomName: "Study Room 101",
    },
    {
      id: "TXN006",
      userId: "1",
      userName: "John Doe",
      type: "payment",
      amount: 200.0,
      status: "completed",
      description: "Auditorium booking deposit",
      date: "2024-03-12T13:15:00Z",
      paymentMethod: "Bank Transfer",
      roomId: "3",
      roomName: "Auditorium",
    },
  ])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: Transaction["status"]) => {
    const variants = {
      completed: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      pending: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      failed: "bg-destructive/20 text-destructive border-destructive/30",
      refunded: "bg-muted text-muted-foreground border-border",
    }
    return variants[status]
  }

  const getTypeBadge = (type: Transaction["type"]) => {
    const variants = {
      booking: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      refund: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      payment: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      subscription: "bg-chart-4/20 text-chart-4 border-chart-4/30",
    }
    return variants[type]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate summary stats
  const totalRevenue = transactions
    .filter((t) => t.status === "completed" && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingAmount = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)

  const completedTransactions = transactions.filter((t) => t.status === "completed").length
  const failedTransactions = transactions.filter((t) => t.status === "failed").length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">From completed transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Pending Amount</CardTitle>
            <Calendar className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{formatCurrency(pendingAmount)}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground">Successful transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Failed</CardTitle>
            <CreditCard className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{failedTransactions}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">Transaction Management</CardTitle>
              <CardDescription className="text-muted-foreground">
                Monitor and manage all financial transactions
              </CardDescription>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-background border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="booking">Booking</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-border text-card-foreground hover:bg-muted bg-transparent">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-muted-foreground">Transaction ID</TableHead>
                  <TableHead className="text-muted-foreground">User</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-mono text-sm text-card-foreground">{transaction.id}</div>
                        <div className="text-xs text-muted-foreground">{transaction.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-card-foreground">{transaction.userName}</div>
                      <div className="text-xs text-muted-foreground">ID: {transaction.userId}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeBadge(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`font-medium ${transaction.amount < 0 ? "text-destructive" : "text-card-foreground"}`}
                      >
                        {formatCurrency(transaction.amount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-card-foreground">{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-card-foreground">{transaction.paymentMethod}</span>
                      </div>
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
