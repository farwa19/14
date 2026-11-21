import Link from "next/link"
import { Suspense } from "react"
import { getUsers } from "../services/users"

const UsersList = async () => {
  const users = await getUsers()

  return (
    <ul className="space-y-3">
      {users.map((user) => (
        <li
          key={user.id}
          className="border rounded-lg p-4 shadow-sm hover:bg-gray-50 transition"
        >
          <Link
            href={`/users/${user.username}`}
            className="text-blue-600 font-medium hover:underline"
          >
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Users = () => (
  <div className="min-h-screen flex justify-center items-center p-6">
    <div className="max-w-2xl w-full p-8 border rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Users
      </h2>

      <Suspense fallback={<p className="text-center text-gray-500">Loading users...</p>}>
        <UsersList />
      </Suspense>
    </div>
  </div>
)

export default Users