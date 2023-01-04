import DisplaySticks from "./displaySticks";
import './win.css';


export default function Win({playerName}) {
  return (
    <div>
        <div className="default">
            
            <h1>{playerName} Won!!!</h1>
            <DisplaySticks howMany={500} />
        </div>

    </div>
  )
}
