import React from "react";
import ClientCard from "./ClientCard";
import {useLocation} from "react-router-dom";

const photoData = {
    1: ["/img/1.jpg","/img/1.11.jpg","/img/1.12.jpg","/img/1.13.jpg","/img/1.15.jpg" ],
    2: ["/img/2.jpg", "/img/2.2.jpg", "/img/2.3.jpg","/img/2.4.jpg","/img/2.5.jpg","/img/2.6.jpg","/img/2.1.jpg"],
    3: ["/img/3.jpg", "/img/3.2.jpg", "/img/3.3.jpg","/img/3.4.jpg","/img/3.1.jpg"],
    4: ["/img/4.jpg","/img/1.1.jpg", "/img/1.2.jpg", "/img/1.3.jpg", "/img/1.4.jpg", "/img/1.5.jpg", "/img/1.6.jpg"],
    5: ["/img/5.jpg", "/img/5.2.jpg", "/img/5.3.jpg","/img/5.4.jpg","/img/5.1.jpg"],
    6: ["/img/6.1.jpg", "/img/6.2.jpg", "/img/6.3.jpg","/img/6.4.jpg","/img/6.5.jpg"],
};

const HomePage = () => {
    const location = useLocation();
    const role = location.state?.role || "user";


    const photos = [
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg",
        "/img/4.jpg",
        "/img/5.jpg",
        "/img/6.1.jpg"
    ];
    const countries = [
        "France",
        "israel",
        "USA",
        "Canada",
        "Japan",
        "Ukraine"
    ];

    return (
        <div className={`container ${role === "admin" ? "admin-style" : "user-style"}`}>
            {photos.map((photo, index) => (
                <ClientCard
                    key={index}
                    id={index + 1}
                    photo={photo}
                    country={countries[index]}
                    role={role}
                    galleryPhoto={photoData[index+1] || []}
                />
            ))}
        </div>
    );
};
export default HomePage;

