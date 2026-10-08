<?php
declare(strict_types=1);

const RECIPIENT = 'keith@keithclemmons.com';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: index.html#contact', true, 303);
    exit;
}

if (trim((string) ($_POST['company'] ?? '')) !== '') {
    render('Sent', 'Thanks. That note is on its way.');
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if (preg_match('/[\r\n]/', $name . $email) === 1) {
    render('Could not send', 'That note could not be sent.', 400);
}

$length = static function (string $value): int {
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
};

if (
    $name === ''
    || $length($name) > 120
    || $length($message) < 2
    || $length($message) > 5000
    || $length($email) > 200
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
) {
    render('Could not send', 'Check the name, email, and message, then try again.', 400);
}

$subject = 'Site note from ' . $name;
$body = "Name: {$name}\nEmail: {$email}\n\n{$message}\n";
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Keith Clemmons site <keith@keithclemmons.com>',
    'Reply-To: ' . $email,
]);
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = mail(RECIPIENT, $encodedSubject, $body, $headers, '-f keith@keithclemmons.com');

if ($sent !== true) {
    render('Could not send', 'The note did not go through. Please try again in a little while.', 500);
}

render('Sent', 'Thanks. That note is on its way.');

function render(string $title, string $message, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: text/html; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    echo <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{$safeTitle} — Keith Clemmons</title>
  <style>
    body { margin: 0; background: #202c45; color: #fff; font-family: Georgia, serif; }
    main { max-width: 40rem; margin: 0 auto; padding: 4rem 1.25rem; }
    a { color: #fff; }
    p { font-family: system-ui, sans-serif; font-size: 1.125rem; line-height: 1.6; color: #c5cedd; }
  </style>
</head>
<body>
  <main>
    <h1>{$safeTitle}</h1>
    <p>{$safeMessage}</p>
    <p><a href="index.html#contact">Back to the site</a></p>
  </main>
</body>
</html>
HTML;
    exit;
}
