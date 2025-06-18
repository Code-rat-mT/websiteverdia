<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "your@email.com";
  $subject = "New message from Verdaia Contact Form";
  $message = "Name: " . $_POST["name"] . "\nEmail: " . $_POST["email"] . "\nMessage:\n" . $_POST["message"];
  $headers = "From: noreply@yourdomain.com";

  if (mail($to, $subject, $message, $headers)) {
    echo "Message sent!";
  } else {
    echo "Failed to send message.";
  }
}
?>
