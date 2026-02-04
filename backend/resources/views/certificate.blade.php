<!DOCTYPE html>
<html>
<head>
    <style>
        @page { margin: 0; }
        body {
            font-family: 'Helvetica', sans-serif;
            background-color: #0B132B; /* Apex Navy */
            color: #EDF2F4;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .border-pattern {
            border: 20px solid #7367F0; /* Apex Purple */
            height: 94.5vh;
            padding: 40px;
            position: relative;
        }
        .inner-border {
            border: 2px solid #5EFCE8; /* Apex Cyan */
            height: 100%;
            padding: 40px;
        }
        .logo {
            font-size: 50px;
            font-weight: bold;
            color: #5EFCE8;
            letter-spacing: -2px;
            margin-bottom: 20px;
        }
        .title {
            font-size: 60px;
            margin-top: 50px;
            text-transform: uppercase;
            letter-spacing: 5px;
        }
        .subtitle {
            font-size: 20px;
            color: #7367F0;
            margin-bottom: 50px;
        }
        .name {
            font-size: 45px;
            font-weight: bold;
            color: #FFFFFF;
            border-bottom: 2px solid #5EFCE8;
            display: inline-block;
            padding: 0 50px;
            margin-bottom: 20px;
        }
        .course-text {
            font-size: 24px;
            margin: 20px 0;
        }
        .course-name {
            color: #5EFCE8;
            font-weight: bold;
        }
        .footer {
            position: absolute;
            bottom: 80px;
            width: 100%;
            left: 0;
        }
        .signature {
            border-top: 1px solid #EDF2F4;
            width: 250px;
            margin: 0 auto;
            padding-top: 10px;
        }
        .cert-id {
            font-size: 12px;
            color: #7367F0;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="border-pattern">
        <div class="inner-border">
            <div class="logo">APEX</div>
            <div class="subtitle">SOFTWARE SOLUTIONS ACADEMY</div>
            
            <div class="title">Certificate</div>
            <p style="font-size: 18px;">OF COMPLETION</p>
            
            <p class="course-text">This is to certify that</p>
            <div class="name">{{ $user->name }}</div>
            
            <p class="course-text">
                has successfully completed the professional course in <br>
                <span class="course-name">{{ $course->title }}</span>
            </p>
            
            <p style="margin-top: 30px;">
                Issued on: {{ $date->format('F j, Y') }}
            </p>

            <div class="footer">
                <div class="signature">
                    <p style="font-weight: bold;">Director, Apex Software Solutions</p>
                </div>
                <div class="cert-id">Verification ID: {{ $cert_no }}</div>
            </div>
        </div>
    </div>
</body>
</html>