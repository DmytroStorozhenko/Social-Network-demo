import preloader from "../../../assets/images/preloader.svg";
import React, {FC} from "react";

type PropsType ={}

let Preloader: FC<PropsType> = () => {
    return <div>
        <img src={preloader} width={100} height={100} />
    </div>
}

export default Preloader;