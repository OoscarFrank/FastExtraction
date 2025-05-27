"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, FileText } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DashboardLayout from "@/components/dashboard-layout";

interface ConversationDetail {
  id: number;
  title: string;
  summary: string;
  keywords: string[];
  date: string;
  duration: string;
  participants?: string[];
  transcription?: string;
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topics?: {
    name: string;
    occurrences: number;
  }[];
}

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [conversation, setConversation] = useState<ConversationDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversationDetail = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/data/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch conversation details");
        }

        const data = await response.json();
        setConversation(data);
      } catch (error) {
        console.error("Error fetching conversation details:", error);
        setConversation(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversationDetail();
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr });
    } catch (error) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="w-full p-4 md:p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-8 w-full">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid gap-6 w-full">
            <Card className="w-full">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex flex-wrap gap-2 mb-4 w-full">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
                <div className="flex gap-4 mt-6 w-full">
                  <Skeleton className="h-9 w-24 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-md" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!conversation) {
    return (
      <DashboardLayout>
        <div className="w-full p-4 md:p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-8 w-full">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Details not available</h1>
          </div>
          <Card className="w-full">
            <CardContent className="p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">Conversation not found</h3>
              <p className="text-gray-500 mt-1">
                The details for this conversation are not available
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.back()}
              >
                Back to dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 w-full">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{conversation.title}</h1>
          </div>
        </div>

        <div className="grid gap-6 mb-6 w-full">
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-row-2 gap-6 mb-6 w-full">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Summary</h3>
                  <p className="text-gray-600">{conversation.summary}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2 w-full">
                    {conversation.keywords.map((keyword, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
