import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function Header({imgUser}) {
    return(
        <header className="header">
            <div className="user">
                <img className='imagenComment' src={`https://unavatar.io/${imgUser}`} alt={imgUser} />
                <div className="userName">
                    <span className="nameUser">{imgUser}</span> <br />
                    <span className="timeUser">hace 2 minutos</span>
                </div>
            </div>
            <Button>
                <DeleteIcon className='trashIcon' />
            </Button>
        </header>
    )
}