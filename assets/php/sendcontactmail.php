<?php

$user = htmlspecialchars($_POST['name']);
$mail = htmlspecialchars($_POST['mail']);
$msg = htmlspecialchars($_POST['msg']);
$od  = "From:". $mail . "\r\n";
$od .= 'MIME-Version: 1.0'."\r\n";
$od .= 'Content-type: text/html; charset=utf-8'."\r\n";
$od2  = "From:TODO\r\n";
$od2 .= 'MIME-Version: 1.0'."\r\n";
$od2 .= 'Content-type: text/html; charset=utf-8'."\r\n";
$adres = "TODO";
$tytul = "Wiadomość wysłana za pomocą formularza kontaktowego";
$wiadomosc = "Przesłano wiadomość za pomocą formularza. Imię i nazwisko podane w formularzu: " . $user ." <br><br><br>";

$wiadomosc .= $msg;

mail($adres, $tytul, $wiadomosc, $od);

$wiadomosc .= "<br>Ninejszy mail jest potwierdzeniem wysłania formularza kontaktowego. Powyższa treść została wysłana na mail biura obsługi klienta <a href='ar-finance.pl'>AR Finance</a>";

mail($mail, $tytul, $wiadomosc, $od2);


?>