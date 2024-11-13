
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); // .html('') clears everything inside the tag

  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div></div>');
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $body.append($tweets);

});

// all jQuery should be inside of this function ^^

// tweets is an array of divs
// append tweets to body
