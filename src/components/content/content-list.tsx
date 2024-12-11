import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import useApi from "@/hooks/useApi";
import { ITEMS_PER_PAGE } from "@/constants";
import { ProtectedContent } from "@/types/database.types";

export default function ProtectedContentList() {
  const { get } = useApi();

  const [contents, setContents] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalContents, setTotalContents] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTotalContents = useCallback(
    async (term: string = "") => {
      try {
        const data = await get.protectedContent(term);
        setTotalContents(data.length);
      } catch (error) {
        console.error("Error fetching total contents:", error);
        setTotalContents(0);
      }
    },
    [get]
  );

  const fetchData = useCallback(
    async (page: number, term: string = "") => {
      try {
        const offset = (page - 1) * ITEMS_PER_PAGE;

        const data = await get.protectedContent(term, offset, ITEMS_PER_PAGE);

        const transformedData: Content[] = data.map(
          (item: ProtectedContent) => ({
            id: String(item.id),
            thumbnail: item.url || "/placeholder.svg",
            caption: item.caption || "No caption provided",
            engagement: {
              views: 0, // Asegúrate de que "views" exista en ProtectedContent
              comments: 0, // Asegúrate de que "comments" exista
              shares: 0,
              likes: 0,
            },
            createdAt: new Date(item.created_at).toLocaleDateString("en-GB"),
            creator: item.user_id || "Unknown",
            status: "Inactive",
          })
        );

        setContents(transformedData);

        if (page === 1) {
          await fetchTotalContents(term);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    },
    [get, fetchTotalContents] // Dependencias relevantes
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchData(1, searchTerm);
  }, [fetchData, searchTerm]);

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [fetchData, currentPage, searchTerm]);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    await fetchTotalContents(term);
  };

  const totalPages = Math.ceil(totalContents / ITEMS_PER_PAGE) || 1;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Protected Content</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by creator..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md"
        />
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">
                Thumbnail
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                Engagement
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                Created Date
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                Creator
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {contents.map((content) => (
              <tr key={content.id} className="border-b">
                <td className="p-4">
                  <div className="relative w-[60px] h-[80px] bg-gray-100 rounded overflow-hidden">
                    <img
                      src={content.thumbnail}
                      alt={content.caption}
                      className="object-cover w-full h-full"
                    />
                    <div className="text-xs text-gray-500 truncate mt-1 mw-[5px]">
                      {content.caption}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>{content.engagement.views} views</div>
                  <div>{content.engagement.comments} comments</div>
                  <div>{content.engagement.shares} shares</div>
                  <div>{content.engagement.likes} likes</div>
                </td>
                <td className="p-4">{content.createdAt}</td>
                <td className="p-4 text-purple-600">{content.creator}</td>
                <td className="p-4">{content.status}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-b">
            <tr className="items-center">
              <td colSpan={5} className="text-center py-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
