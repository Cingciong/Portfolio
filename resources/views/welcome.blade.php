<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Portfolio of Igor Maciejak, a Full-Stack Web Developer and Freelance Photographer offering custom web development and professional photography services.">
    <meta name="keywords" content="Igor Maciejak, Full-Stack Developer, Web Developer, Freelance Photographer, Portfolio, Web Development, Photography, Frontend Developer, Backend Developer, Web Design, Software Developer, Digital Photography">

    <!-- Open Graph / Facebook -->
    <meta property="og:title" content="Igor Maciejak | Full-Stack Developer & Freelance Photographer">
    <meta property="og:description" content="Explore the portfolio of Igor Maciejak, a skilled full-stack web developer and freelance photographer providing quality web solutions and photography services.">
    <meta property="og:image" content="../../public/assets/page/profile/DSCF5554-4-800w.webp"> <!-- Replace with the link to your main portfolio image -->
    <meta property="og:url" content="www.igormaciejak.com"> <!-- Replace with your portfolio URL -->

    <!-- Twitter -->
    <meta name="twitter:card" content="../../public/assets/page/profile/DSCF5554-4-800w.webp">

    <title>Igor Maciejak Portfolio | Full-Stack Developer & Freelance Photographer</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/01f5f71df4.js" crossorigin="anonymous"></script>
    <!-- Styles -->
    @vite('recourses/css/app.css')
</head>
<body id="app" class="min-h-screen w-full ">
@vite('resources/js/app.js')
</body>
</html>
