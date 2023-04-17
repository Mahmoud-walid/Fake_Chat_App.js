const messageContent = $('.msgs_content');
const messageInput = $('.msg_input');
const messageSubmit = $('.msg_submit');
const avatarImage = '../images/Fake_Chat-transparent.png';
const fakeMessages = [
    'Hi there, I am Chat and you?',
    'Nice to meet you',
    'How are you?',
    'Okay',
    'Not too bad, thanks',
    'That is awesome',
    'No',
    'Youtube is a nice place to share video',
    'I think you are a nice person',
    'No',
    'Why do you think that?',
    'wait!',
    'Can you explain?',
    'Anyway I have gotta go now',
    'Okay',
    'It was a pleasure chat with you',
    'Time to make a new video',
    'Okay',
    'Bye',
    ':)',
];
let minutes = 0
$(window).on('load', function () {
    messageContent.mCustomScrollbar();
    setTimeout(fakeMessage, 100);
});

function updateScrollbar() {
    messageContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function addTimestamp() {
    const date = new Date();
    const minutesNow = date.getMinutes();

    if (minutes != minutesNow) {
        minutes = minutesNow;
        const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);
        $('.msg:last').append(timeStamp);
    }
}

function addMessageToPage(msg, isPersonal = false) {
    const message = $('<div class="msg"></div>').text(msg);
    if (isPersonal) {
        message.addClass('msg_personal');
    } else {
        const figure = $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    }
    $('.mCSB_container').append(message);
    addTimestamp();
    updateScrollbar();
}

function insertMessage() {
    const messageText = messageInput.val().trim();
    if (messageText == '') {
        return false;
    }
    addMessageToPage(messageText, true);
    messageInput.val('');
    setTimeout(function () {
        fakeMessage();
    }, 1000 + (Math.random() * 20) * 100)
}

messageInput.on('keydown', function (e) {
    if (e.which === 13) {
        insertMessage()
        return false
    }
});

messageSubmit.on('click', insertMessage);

function fakeMessage() {
    if (messageInput.val() !== '') {
        return false
    }


    const loadingMessage = $('<div class ="msg loading new" ></div>')
    const figure = $('<figure class="avatar" ></figure>')
    const image = $('<img>').attr('src', avatarImage)
    figure.append(image)
    loadingMessage.append(figure).append($('<span></span>'))
    $('.mCSB_container').append(loadingMessage)
    updateScrollbar();

    setTimeout(function () {
        loadingMessage.remove();
        addMessageToPage(fakeMessages.shift());
    }, 1000 + (Math.random() * 20) * 100);
};