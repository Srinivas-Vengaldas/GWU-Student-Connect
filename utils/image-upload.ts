// This is a mock implementation for demo purposes
// In a real application, this would upload to a server or cloud storage

export const handleImageUpload = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        const imageUrl = e.target.result.toString()
        resolve(imageUrl)
      }
    }
    reader.readAsDataURL(file)
  })
}

export function saveProfileImage(imageUrl: string): void {
  try {
    const profileData = localStorage.getItem("gwConnectUserProfile")
    if (profileData) {
      const userData = JSON.parse(profileData)
      userData.avatar = imageUrl
      localStorage.setItem("gwConnectUserProfile", JSON.stringify(userData))

      // Force an update event that components can listen to
      window.dispatchEvent(new Event("storage"))
    } else {
      localStorage.setItem(
        "gwConnectUserProfile",
        JSON.stringify({
          avatar: imageUrl,
        }),
      )

      // Force an update event that components can listen to
      window.dispatchEvent(new Event("storage"))
    }
  } catch (error) {
    console.error("Error saving profile image:", error)
  }
}
