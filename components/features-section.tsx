import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-[#0033A0] mb-12">Connect with Your Academic Community</h2>

        {/* Find Peers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-[#0033A0] mb-4">Find Peers</h3>
            <p className="text-gray-700 mb-6">
              Connect with students, faculty, and alumni based on school, course, or graduation year. Build your network
              and find like-minded individuals who share your academic interests and career goals.
            </p>
            <Link href="/register">
              <Button className="bg-[#0033A0] hover:bg-[#002180]">Get Started</Button>
            </Link>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/find-peers.png"
              alt="Students connecting with peers"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Chat & Collaborate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/chat-collaborate.png"
              alt="Students collaborating virtually"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0033A0] mb-4">Chat & Collaborate</h3>
            <p className="text-gray-700 mb-6">
              Engage in real-time conversations and collaborate on projects with peers and mentors. Our platform makes
              it easy to connect virtually, whether you're on campus or studying remotely.
            </p>
            <Link href="/register">
              <Button className="bg-[#0033A0] hover:bg-[#002180]">Start Collaborating</Button>
            </Link>
          </div>
        </div>

        {/* Study Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-[#0033A0] mb-4">Study Groups</h3>
            <p className="text-gray-700 mb-6">
              Create or join study groups to prepare for exams and work on assignments together. Collaborate with peers
              in your courses to enhance your learning experience and improve academic performance.
            </p>
            <Link href="/register">
              <Button className="bg-[#0033A0] hover:bg-[#002180]">Join a Group</Button>
            </Link>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/study-groups.png"
              alt="Students in a study group"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Share Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/share-resources.png"
              alt="Students sharing resources"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0033A0] mb-4">Share Resources</h3>
            <p className="text-gray-700 mb-6">
              Access and share study materials, notes, and educational resources with your peers. Build a collaborative
              knowledge base that helps everyone succeed in their academic journey.
            </p>
            <Link href="/register">
              <Button className="bg-[#0033A0] hover:bg-[#002180]">Share Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
