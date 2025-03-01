import { Edit3 } from "lucide-react"
import { useState } from "react"
import EditForm from "./EditForm"


function EditCategory({ categoryname, categoryslug, categoryid }: { categoryname: string, categoryslug: string, categoryid: string }) {
  const [isEdit, setIsEdit] = useState(false)


  return (
    <>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-md">
        <Edit3 size={15} onClick={() => setIsEdit(true)} />
      </div>
      {isEdit &&
        <EditForm categoryname={categoryname} categoryslug={categoryslug} categoryid={categoryid} setIsEdit={setIsEdit} />
      }

    </>
  )
}

export default EditCategory
