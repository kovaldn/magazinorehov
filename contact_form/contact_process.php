<?php

include dirname(dirname(__FILE__)).'/mail.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{
// include 'email_validation.php';

$name = stripslashes($_POST['name']);
$phone = stripslashes($_POST['phone']);

foreach($_POST as $key => $value)
$res = $res." ".$key." : ".$value."<br>";

$subject = 'Заявка на орехи';


$message = '
	<html>
			<head>
					<title>Заявка на орехи</title>
			</head>
			<body>
					<p>'.$res.'</p>
			</body>
	</html>';


$error = '';

if(!$name)
{
$error .= 'Пожалуйста, введите ваше имя.<br />';
}

if(!$phone)
{
$error .= 'Пожалуйста, введите ваш телефон.<br />';
}



if(!$error)
{

	// $headers  = "Content-type: text/html; charset=utf-8 \r\n";
	// $headers .= "From: Yawork <franshiza@yawork.ru>\r\n";

	$mail = mail(CONTACT_FORM, $subject, $message,
	     "From: ".$name." <".$email.">\r\n"
	    ."Reply-To: ".$email."\r\n"
	    ."Content-type: text/html; charset=utf-8 \r\n"
	    ."X-Mailer: PHP/" . phpversion());


if($mail)
{
echo 'OK';
}

}
else
{
echo '<div class="bg-danger">'.$error.'</div>';
}

}
?>