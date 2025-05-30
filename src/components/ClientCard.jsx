import React, {useState, useEffect} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/HomePage.css";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {TableContainer} from "@mui/material";

const ClientCard = ({id, photo, country, galleryPhoto, role}) => {
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();

    const [entryDate, setEntryDate] = useState(null);
    const [exitDate, setExitDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [showSlider, setShowSlider] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [isFlying, setIsFlying] = useState(false);
    const [likeCount, setLikeCount] = useState(0);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vacations_like/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setLikeCount(data.like_count);
            })
            .catch((err) => console.error("Error loaded likes:", err));
    }, [id]);

    const handleCancel = () => {
        console.log('Cancel button clicked');
        setIsDateSelected(false);
        setEntryDate(null);
        setExitDate(null);
        setIsChecked(false);
    };

    const handleClickChange = () => {
        console.log("Checkbox clicked");

        if (!isChecked) {
            if (!userId) {
                alert("Error: user is not authorized.");
                toast.error("Error: user is not authorized.", {
                    style: {
                        width: '400px',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        height: 'auto',
                        fontSize: '18px',
                    },
                    progressStyle: {
                        height: '4px',
                        borderRadius: '0 0 8px 8px',
                    },
                    position: "top-left",
                    autoClose: 3000,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            setIsChecked(true);
            setShowHeart(true);

            fetch("http://127.0.0.1:8000/api/vacations_like", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    vacation_id: id,
                    user_id: userId,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("response from server:", data);
                    if (data.message === "Like already exists") {
                        console.log("Like already exists");
                        // alert("you already liked this card");
                        toast.warning("You already liked this card", {
                            style: {
                                width: '400px',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                height: 'auto',
                                fontSize: '18px',
                            },
                            progressStyle: {
                                height: '4px',
                                borderRadius: '0 0 8px 8px',
                            },
                            position: "top-left",
                            autoClose: 3000,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        setIsChecked(false);
                    } else {
                        setLikeCount(data.like_count);

                    }
                })
                .catch((err) => {
                    console.error("Error sending like:", err);
                    setIsChecked(false);
                });

            setTimeout(() => {
                setShowHeart(false);
            }, 2000);
        }
    };
    const handleAddTrip = () => {
        if (!userId) {
            // alert("Error: user is not authorised.");
            toast.error("Error: user is not authorised.", {
                style: {
                    width: '400px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    height: 'auto',
                    fontSize: '18px',
                },
                progressStyle: {
                    height: '4px',
                    borderRadius: '0 0 8px 8px',
                },
                position: "top-left",
                autoClose: 6000,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        if (!entryDate || !exitDate) {
            // alert("Error: select travel dates");
            toast.warning("Error: select travel dates", {
                style: {
                    width: '400px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    height: 'auto',
                    fontSize: '18px',
                },
                progressStyle: {
                    height: '4px',
                    borderRadius: '0 0 8px 8px',
                },
                position: "top-left",
                autoClose: 3000,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        fetch("http://127.0.0.1:8000/api/vacation_new", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: userId,
                place: country,
                start_date: entryDate,
                end_date: exitDate,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Trip successfully added!") {
                    // alert("Trip successfully added!");
                    toast.success("Trip successfully added!", {
                        style: {
                            width: '400px',
                            overflow: 'hidden',
                            borderRadius: '8px',
                            height: 'auto',
                            fontSize: '18px',
                        },
                        progressStyle: {
                            height: '4px',
                            borderRadius: '0 0 8px 8px',
                        },
                        position: "top-center",
                        autoClose: 6000,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setIsDateSelected(true);
                } else {
                    alert("Error adding trip.");
                }
            })
            .catch((err) => console.error("Error sending travel:", err));
    };

    const handleFlightAnimation = () => {
        setIsFlying(true);
        setTimeout(() => setIsFlying(false), 2000);
    }
    const handleDateChange = (e, type) => {
        const valDate = e.target.value;
        if (type === "entry") {
            console.log(`Entry date changed to: ${valDate}`);
            setEntryDate(valDate);
        } else {
            console.log(`Exit date changed to: ${valDate}`);
            setExitDate(valDate);
        }
    };

    const handlePhotoClick = () => {
        setShowSlider(true)
    };

    const handleCloseSlider = () => {
        setShowSlider(false)
    };

    const galleryImadge = galleryPhoto.map((img) => ({
        original: img,
        thumbnail: img,
        originalClass: "fixed-img-size",

    }));

    return (
        <div className="card">
            {!isDateSelected ? (
                <>
                    <h3>
                        <a
                            href={`https://en.wikipedia.org/wiki/${country}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="country-link"
                        >
                            {country}
                        </a>
                    </h3>
                    <div className="photo-container" onClick={handlePhotoClick}>
                        <img src={photo} alt={`Foto ${id}`} className="client-photo"/>
                    </div>
                    <div className="like-container">
                        <button className="heart-button" onClick={handleClickChange}>
                            {isChecked ? '❤️' : '🤍'}
                        </button>
                        <span className="like-count">{likeCount}</span>
                        {showHeart && <span className="heart-animation">&#10084;&#65039;</span>}
                    </div>
                    <div className="calendar-container">
                        <div className="calendar">
                            <label htmlFor={`entry-date-${id}`}>Entry date:</label>
                            <input
                                id={`entry-date-${id}`}
                                type="date"
                                value={entryDate || ""}
                                onChange={(e) => handleDateChange(e, "entry")}
                            />
                        </div>
                        <div className="calendar">
                            <label htmlFor={`exit-date-${id}`}>Exit date:</label>
                            <input
                                id={`exit-date-${id}`}
                                type="date"
                                value={exitDate || ""}
                                onChange={(e) => handleDateChange(e, "exit")}
                                min={entryDate}
                            />
                        </div>
                    </div>
                    <button onClick={() => {
                        handleFlightAnimation();
                        handleAddTrip();
                    }}
                            className="add-button">
                        Add Trip
                    </button>
                    <TableContainer/>
                    {isFlying && <span className="plane-fly">&#128747;</span>}
                    <h5 className="rules-link">
                        <a href="/vacation-rules" onClick={(e) => {
                            e.preventDefault();
                            navigate('/vacation-rules');
                        }}>
                            Rules Vacation
                        </a>
                    </h5>
                </>
            ) : (
                <div className="date-info">
                    <p>
                        You chose:
                        <br/>
                        <strong>Entry:</strong> {entryDate} <br/>
                        <strong>Exit:</strong> {exitDate} <br/>
                        We will connect with you.
                    </p>
                    <button onClick={handleCancel} className="cancel-button">
                        Cancel
                    </button>
                </div>
            )}
            {showSlider && (
                <div className="slider-overlay" onClick={handleCloseSlider}>
                    <div className="slider-container" onClick={(e) => e.stopPropagation()}>
                        <ImageGallery items={galleryImadge}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientCard;


