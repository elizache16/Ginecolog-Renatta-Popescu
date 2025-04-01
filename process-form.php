<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $message = $_POST['message'];

    $to = "Larisa.topor@gmail.com";
    $subject = "Nouă programare de la: " . $name;
    
    $email_content = "Detalii programare:\n\n";
    $email_content .= "Nume: " . $name . "\n";
    $email_content .= "Email: " . $email . "\n";
    $email_content .= "Telefon: " . $phone . "\n";
    $email_content .= "Serviciu: " . $service . "\n";
    $email_content .= "Data: " . $date . "\n";
    $email_content .= "Ora: " . $time . "\n";
    $email_content .= "Mesaj: " . $message . "\n";

    $headers = "From: " . $email . "\r\n";

    if(mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["success" => true, "message" => "Programarea a fost trimisă cu succes!"]);
    } else {
        echo json_encode(["success" => false, "message" => "A apărut o eroare. Vă rugăm să încercați din nou."]);
    }
}
?> 