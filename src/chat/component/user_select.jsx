import { Box, Image } from "@yamada-ui/react";
import './css/user_select.css'

const UserSelect = ({ users, onSelectUser }) => {
    return (
        <Box className="userbox">
            <h1 className="usermap">ユーザー一覧</h1>
            {users.map(user => (
                <button key={user.id} onClick={() => onSelectUser(user.id)} className="selectbutton">
                    <Image className="userimage" src={user.prof_image ? `http://127.0.0.1:5000/prof_image/${user.prof_image}` : '/not_profileicon.jpg'} />
                    {user.name}
                </button>
            ))}
        </Box>
    )
}

export default UserSelect;