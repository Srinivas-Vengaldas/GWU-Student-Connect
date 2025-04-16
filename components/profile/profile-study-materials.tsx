import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MaterialCard } from "@/components/study-materials/material-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookMarked, ChevronRight } from "lucide-react"

interface ProfileStudyMaterialsProps {
  student: any
  limit?: number
}

export function ProfileStudyMaterials({ student, limit }: ProfileStudyMaterialsProps) {
  // This would be fetched from an API in a real app
  const materials = [
    {
      id: "1",
      title: "Introduction to Cognitive Psychology - Lecture Notes",
      description:
        "Comprehensive notes from the introductory cognitive psychology lectures covering memory, attention, and perception theories.",
      fileType: "pdf",
      fileSize: "2.8 MB",
      tags: ["PSY 201", "Cognitive", "Lecture Notes"],
      rating: 4.8,
      ratingCount: 24,
      downloads: 156,
      isFavorite: false,
      uploader: {
        name: student.name,
        avatar: student.avatar,
      },
      uploadDate: "Mar 15, 2024",
    },
    {
      id: "2",
      title: "Research Methods in Psychology - Study Guide",
      description:
        "A detailed study guide for the research methods course, including experimental design, statistical analysis, and ethical considerations.",
      fileType: "docx",
      fileSize: "1.4 MB",
      tags: ["PSY 300", "Research Methods", "Study Guide"],
      rating: 4.5,
      ratingCount: 18,
      downloads: 112,
      isFavorite: false,
      uploader: {
        name: student.name,
        avatar: student.avatar,
      },
      uploadDate: "Feb 20, 2024",
    },
    {
      id: "3",
      title: "Neuroscience Fundamentals - Presentation",
      description:
        "Slides covering the fundamentals of neuroscience, including neural structure, function, and communication.",
      fileType: "pptx",
      fileSize: "5.2 MB",
      tags: ["PSY 315", "Neuroscience", "Presentation"],
      rating: 4.9,
      ratingCount: 32,
      downloads: 205,
      isFavorite: false,
      uploader: {
        name: student.name,
        avatar: student.avatar,
      },
      uploadDate: "Apr 5, 2024",
    },
    {
      id: "4",
      title: "Statistical Analysis for Psychology - Practice Problems",
      description: "Practice problems and solutions for statistical methods commonly used in psychological research.",
      fileType: "pdf",
      fileSize: "3.1 MB",
      tags: ["PSY 310", "Statistics", "Practice Problems"],
      rating: 4.7,
      ratingCount: 15,
      downloads: 98,
      isFavorite: false,
      uploader: {
        name: student.name,
        avatar: student.avatar,
      },
      uploadDate: "Mar 28, 2024",
    },
  ]

  const displayMaterials = limit ? materials.slice(0, limit) : materials

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <BookMarked className="mr-2 h-5 w-5 text-[#0033A0]" />
          Study Materials
          <Badge className="ml-2">{materials.length}</Badge>
        </CardTitle>
        {limit && materials.length > limit && (
          <Link href={`/student/study-materials?user=${student.id}`}>
            <Button variant="ghost" className="h-8 w-8 p-0" title="View all study materials">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {displayMaterials.length > 0 ? (
          <div className="space-y-4">
            {displayMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} isOwner={student.isCurrentUser} />
            ))}

            {limit && materials.length > limit && (
              <div className="pt-2 text-center">
                <Link href={`/student/study-materials?user=${student.id}`}>
                  <Button variant="outline" size="sm">
                    View All ({materials.length}) Materials
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <BookMarked className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No study materials yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
