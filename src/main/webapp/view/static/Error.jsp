<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PMS | 404</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FFFFFF; /* White background */
            color: #021B79; /* Dark Blue for text */
            text-align: center;
            margin: 0;
            padding: 0;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
        }

        h1 {
            font-size: 128px;
            margin: 0;
            color: #FFA500; /* Orange for large 404 text */
        }

        h2 {
            font-size: 32px;
            margin: 20px 0;
            color: #021B79; /* Dark Blue for secondary heading */
        }

        p {
            font-size: 18px;
            color: #0575E6; /* Lighter Blue for message text */
            margin-bottom: 40px;
        }

        a {
            color: #FFFFFF;
            background-color: #021B79;
            text-decoration: none;
            font-size: 20px;
            padding: 10px 20px;
            border: 2px solid #021B79; /* Dark Blue border */
            border-radius: 5px;
            
            transition: background-color 0.3s, color 0.3s,box-shadow 0.3s;
        }

        a:hover {
            background-color: #021B79;
            color: #FFFFFF;
            box-shadow: 0px 5px 15px #000030
        }

        .background-bubbles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }

        .bubble {
            position: absolute;
            background-color: #FFA500; /* Orange bubbles */
            border-radius: 50%;
            opacity: 0.3;
            animation: float 10s infinite;
        }

        .bubble.blue {
            background-color: #0575E6; /* Light Blue bubbles */
        }
         .bubble.darkblue {
            background-color: #021B79; /* Dark Blue bubbles */
        }
        

        @keyframes float {
            0% {
                transform: translateY(0) scale(1);opacity: 0.1;
            }
            35% {
                transform: translateY(0) scale(1.1);opacity: 0.3;
            }
            70% {
                transform: translateY(0) scale(1.3);opacity: 0.5;
            }
            100% {
                transform: translateY(0) scale(1);opacity: 0.1;
            }
        }

        /* Bubble sizes and positions */
        .bubble.bubble-1 {
            width: 150px;
            height: 150px;
            bottom: 10%;
            left: 15%;
            animation-duration: 4s;
        }

        .bubble.bubble-2 {
            width: 100px;
            height: 100px;
            top: 20%;
            right: 20%;
            animation-duration: 6s;
        }

        .bubble.bubble-3 {
            width: 100px;
            height: 100px;
            top: 50%;
            left: 70%;
            animation-duration: 5s;
        }

        .bubble.bubble-4 {
            width: 250px;
            height: 250px;
            bottom: 15%;
            right: 4%;
            animation-duration: 4s;
        }
        .bubble.bubble-5 {
            width: 220px;
            height: 220px;
            bottom: 15%;
            right: 40%;
            animation-duration: 10s;
        }
        .bubble.bubble-6 {
            width: 200px;
            height: 200px;
            bottom: 40%;
            right: 85%;
            animation-duration: 10s;
        }
        .bubble.bubble-7 {
            width: 230px;
            height: 230px;
            bottom: 80%;
            right: 30%;
            animation-duration: 6.5s;
        }
        
        .bubble.bubble-8 {
            width: 100px;
            height: 100px;
            top: 18%;
            left: 24%;
            animation-duration: 6s;
        }
        
        .bubble.bubble-9 {
            width: 280px;
            height: 280px;
            top: 10%;
            left: 35%;
            animation-duration: 5s;
        }
        
        .bubble.bubble-10 {
            width: 220px;
            height: 220px;
            top: 90%;
            right: 55%;
            animation-duration: 3.5s;
        }
    </style>
</head>
<body>
    <div class="background-bubbles">
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2 darkblue"></div>
        <div class="bubble bubble-3"></div>
        <div class="bubble bubble-4 blue"></div>
        <div class="bubble bubble-5 "></div>
        <div class="bubble bubble-6 blue"></div>
        <div class="bubble bubble-7 "></div>
        <div class="bubble bubble-8"></div>
        <div class="bubble bubble-9 blue"></div>
        <div class="bubble bubble-10 darkblue"></div>
    </div>

    <h1>404</h1>
    <h2>Page not found</h2>
    <p>Oops! The page you are looking for does not exist.</p>
    <a href="MainDashBoard.htm">Back to Home</a>
</body>
</html>