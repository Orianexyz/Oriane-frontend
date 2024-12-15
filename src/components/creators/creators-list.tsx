import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { ProtectedUser, WatchedUser } from "@/types/database.types";

export default function CreatorsList() {
  const api = useApi();
  const [activeTab, setActiveTab] = useState("watched");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [watchedCreators, setWatchedCreators] = useState<Creator[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  const headers = [
    "Username",
    "Content Count",
    "Alerts",
    "Created Date",
    "Status",
    "Actions",
  ];

  const rows = activeTab === "watched" ? watchedCreators : creators;

  useEffect(() => {
    const fetchCreatorsData = async () => {
      setIsLoading(true);
      try {
        // Fetch data from `protected_users`
        const protectedUsers = await api.get.protectedUsers();
        const transformedProtectedCreators: Creator[] = protectedUsers.map(
          (user: ProtectedUser) => ({
            id: user.id,
            username: user.username || "Unknown",
            contentCount: 0,
            alerts: 0,
            createdDate: new Date(user.created_at).toLocaleDateString("en-GB"),
            status: "Active",
          })
        );

        // Fetch data from `watched_users`
        const watchedUsers = await api.get.watchedUsers();
        const transformedWatchedCreators: Creator[] = watchedUsers.map(
          (user: WatchedUser) => ({
            id: user.id,
            username: user.username || "Unknown",
            contentCount: 0,
            alerts: 0,
            createdDate: new Date(user.created_at).toLocaleDateString("en-GB"),
            status: "Watched",
          })
        );

        // Update state
        setCreators(transformedProtectedCreators);
        setWatchedCreators(transformedWatchedCreators);
        setError(null);
      } catch (err) {
        console.error("Error fetching creators data:", err);
        setError("Failed to fetch creators data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreatorsData();
  }, [api]);

  const filteredRows = rows.filter((creator) =>
    creator.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Creators</h1>
      <Tabs defaultValue="watched" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="watched"
              className="data-[state=active]:bg-white"
            >
              Watched Users
            </TabsTrigger>
            <TabsTrigger
              value="protected"
              className="data-[state=active]:bg-white"
            >
              Protected Users
            </TabsTrigger>
          </TabsList>
          <Input
            placeholder="Search creators"
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="watched" className="border rounded-lg">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header} className="text-center p-4">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.map((creator) => (
                <TableRow key={creator.id}>
                  <TableCell className="text-center">
                    {creator.username}
                  </TableCell>
                  <TableCell className="text-center">
                    {creator.contentCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {creator.alerts}
                  </TableCell>
                  <TableCell className="text-center">
                    {creator.createdDate}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        creator.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {creator.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                      <Link to={`/creators/${creator.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
