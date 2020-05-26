import preloader from "../../../assets/images/preloader.svg";
import React from "react";

let Preloader = (props) => {
    return <div>
        <img src={preloader} width={100} height={100} />
    </div>
}

export default Preloader;