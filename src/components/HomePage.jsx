import React from "react";
import ClientCard from "./ClientCard";
import {useLocation} from "react-router-dom";



const HomePage = () => {
    const location = useLocation();
    const role = location.state?.role || "user";


    const photos = [
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg",
        "/img/4.jpg",
        "/img/5.jpg",
        "/img/6.jpg"
    ];
    const countries = [
        "France",
        "israel",
        "USA",
        "Canada",
        "Japan",
        "Brasil"
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
                />
            ))}
        </div>
    );
};
export default HomePage;

