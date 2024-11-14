$(document).ready(() => {
  const $body = $('#body');
  $body.html('');

  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div class="list-group-item"></div>'); // bootstrap
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $body.append($tweets);

});

