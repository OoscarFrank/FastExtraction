"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/dashboard-layout";

interface ConversationData {
  id: number;
  summary: string;
  keywords: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/data");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use empty array in case of error
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredConversations = conversations.filter(
    (convo) =>
      convo.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convo.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleCardClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="w-full p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              View summaries and keywords from your conversations
            </p>
          </div>
        </div>

        <div className="mb-6 relative w-full">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search by summary or keyword..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="h-[200px]">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-12 w-full">
            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">No summaries found</h3>
            <p className="text-gray-500 mt-1">
              {searchTerm
                ? "Try modifying your search criteria"
                : "No conversation summaries available"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
            {filteredConversations.map((convo) => (
              <Card
                key={convo.id}
                className="cursor-pointer hover:shadow-md transition-shadow w-full"
                onClick={() => handleCardClick(convo.id)}
              >
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {convo.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {convo.keywords?.slice(0, 5).map((keyword, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
