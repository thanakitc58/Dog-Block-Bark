/**
 * AdminHeader Component
 * Top header for admin panel
 */
function AdminHeader({ title }) {
  return (
    <div className="w-[1160px] h-24 border-b border-[#DAD6D1] flex items-center px-[60px] py-6">
      <h2 className="text-xl font-semibold text-brown-900">{title}</h2>
    </div>
  )
}

export default AdminHeader

