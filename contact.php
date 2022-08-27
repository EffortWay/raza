<?php

error_reporting(0);

$from = 'example@website.com';
$to = 'example@website.com';

$thankyou = 'Thank you! Your mail was sent successfully.';
$errormsg = 'Sorry! Something went wrong on the mail server.';

if( !isset( $_POST ) ) {
	return;
}

$fields = array(
	'name' => 'Name',
	'email' => 'E-mail',
	'website' => 'Website',
	'subject' => 'Subject',
	'message' => 'Message',
);

$errors = array();
$message = array();

foreach( $fields as $key => $value ) {
	if( !isset( $_POST[$key] ) ) {
		if( $key != 'website' ) {
			$errors[] = $value . ' is required';
		}
	} else {
		$data = $_POST[$key];
		if( $key == 'email' ) {
			if( filter_var( $data, FILTER_VALIDATE_EMAIL ) ) {
				$message[ $value ] = $data;
			} else {
				$errors[] = 'Please enter a valid email';
			}
		} else {
			$message[ $value ] = $data;
		}
	}
}

if( empty( $errors ) ) {

	try {

		// All the neccessary headers for the email.
		$headers = array('Content-Type: text/html; charset=ISO-8859-1;',
			'MIME-Version: 1.0',
			'From: ' . $from,
			'Reply-To: ' . $_POST['email'],
			'Return-Path: ' . $from,
		);

		$emailText = '<html><body><table>';

		foreach( $message as $key => $value ) {
			$emailText .= sprintf( '<tr><th>%s</th><td>%s</td></tr>', $key, $value );
		}

		$emailText .= '</table></body></html>';

		// Send email
		$email_status = mail( $to, $_POST['subject'], $emailText, implode("\n", $headers) );

		if( $email_status ) {

			$responseArray = array(
				'success' => true,
				'data' => $thankyou,
			);

		} else {

			$responseArray = array(
				'success' => false,
				'data' => $errormsg,
			);

		}

	} catch( Exception $e ) {

		$responseArray = array(
			'success' => false,
			'data' => $e->getMessage(),
		);

	}

} else {

	$responseArray = array(
		'success' => false,
		'data' => implode( '<br>', $errors ),
	);

}

// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
// else just display the message
else {
    // echo $responseArray['message'];
    header('');
    exit;
}