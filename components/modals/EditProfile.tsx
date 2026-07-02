import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function EditProfile({userId,userData,onCancel}:{userId:string,userData:{username:string,name:string,image_url:string,email:string},onCancel:()=>void}) {
    const router = useRouter();
  const [username,setUsername]=useState(userData.username)
  const [name,setName]=useState(userData.name)
  const [email,setEmail]=useState(userData.email)
  const [image_url,setImage_url]=useState(userData.image_url)
  
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(image_url);
  const [loading,setLoading]=useState(true);
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !userId) return;

        setPreview(URL.createObjectURL(file));

        try {
        setUploading(true);
        const fd = new FormData();
        fd.append("file", file);
        fd.append("userId", userId); 

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/`, {
            method: "POST",
            body: fd,
        });

        if (!res.ok) throw new Error("Upload failed");

        const { url } = await res.json();
        setImage_url(url);
        toast.success("Image uploaded!");
        } catch (err) {
        console.error(err);
        toast.error("Upload failed");
        } finally {
        setUploading(false);
        }
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
            const data={username: username,name: name,imageUrl: image_url,email:email}
            const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_2}/update-info/${userId}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
            );
    
            if (response.ok) {
            toast.success("updated");
            router.push("/profile");
            router.refresh();
            } else {
            const txt = await response.text();
            toast.error(txt || "updating failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };
    
  return (
    <div className="bg-mainbg-2 min-h-screen flex items-center justify-center">
      <div className="w-full sm:max-w-md rounded-lg bg-mainbg-1 shadow">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white">Edit profile</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* avatar */}
            <div>
              <label
                htmlFor="avatar"
                className="block mb-2 text-sm font-medium text-gray-200"
              >
                Profile picture
              </label>

              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-gray-700 file:text-gray-200
                           hover:file:bg-gray-600"
              />

              {uploading && (
                <p className="mt-1 text-xs text-gray-400">Uploading…</p>
              )}

              {preview && !uploading && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-3 h-24 w-24 rounded-full object-cover"
                />
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-gray-700 p-2.5 text-sm text-white
                           placeholder-gray-400 border border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Username
              </label>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-gray-700 p-2.5 text-sm text-white
                           placeholder-gray-400 border border-gray-600"
              />
            </div>

            {/* name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-gray-700 p-2.5 text-sm text-white
                           placeholder-gray-400 border border-gray-600"
              />
            </div>

            {/* actions */}
            <div className="flex gap-3">
              <Button type="submit" disabled={uploading} className="flex-1">
                Update
              </Button>

              <Button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
