import { Modal } from "@mui/material"
import EditTenantForm from "./EditTenantForm";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query"

const Popup = ({ tenant, setEdit, edit }) => {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const refetchTenants = () => queryClient.invalidateQueries(['tenants'])
    const handleClose = (e, reason) => {
        if(reason === 'clickaway') return
        else {
            setEdit(false)
        }
    }

    return (  
        <Modal
            open={edit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <EditTenantForm setOpen={setOpen} updateFn={refetchTenants} tenant={tenant} open={open} handleClose={handleClose} setEdit={setEdit} />
        </Modal>
    );
}
 
export default Popup;