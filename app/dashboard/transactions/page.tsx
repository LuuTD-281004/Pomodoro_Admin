"use client";

import { useEffect, useState } from "react";
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
import { Search, Download, CreditCard } from "lucide-react";
import { Transaction } from "@/types/transaction";
import { getTransactions } from "@/axios/transaction";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("username");
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getTransactions(page, limit);
      const data = response.result.data;
      const total = response.result.pagination.total;
      setTransactions(data);
      setTotal(total);
    } catch (err) {
      console.error("Failed to load transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, limit]);
  console.log(transactions);
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.transferType === statusFilter;
    const matchesType =
      typeFilter === "all" || transaction.gateway === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const formatCurrency = (amount: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    }).format(parseFloat(amount));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction Management</CardTitle>
              <CardDescription>
                Monitor and manage all financial transactions
              </CardDescription>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search + filters */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border border-border overflow-x-auto">
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : (
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow className="border-border hover:bg-muted/50">
                    <TableHead className="text-muted-foreground w-[160px]">
                      Transaction ID
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[160px]">
                      User
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[140px]">
                      Amount
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[180px]">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[160px]">
                      Payment Method
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[160px]">
                      Payment Package
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="border-border hover:bg-muted/50"
                    >
                      <TableCell className="max-w-[160px] truncate">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="font-mono text-sm text-card-foreground truncate cursor-pointer">
                                {transaction.id}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>{transaction.id}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="text-xs text-muted-foreground truncate">
                          {transaction.description}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[160px] truncate">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-card-foreground truncate cursor-pointer">
                                {transaction.user?.username}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {transaction.user?.username}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${
                            parseInt(transaction.transferAmount) < 0
                              ? "text-destructive"
                              : "text-card-foreground"
                          }`}
                        >
                          {formatCurrency(transaction.transferAmount)}
                        </div>
                      </TableCell>

                      <TableCell className="text-card-foreground">
                        {formatDate(transaction.transactionDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-card-foreground">
                            {transaction.gateway}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[160px] truncate">
                        <div className="font-medium text-card-foreground">
                          {transaction.paymentPackage?.nameEn}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span>
              Page {page} of {Math.ceil(total / limit)}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil(total / limit)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
