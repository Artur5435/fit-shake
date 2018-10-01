var AnimationInProgress = 0;
var currentMenu = document.getElementById('MainPage');

//funkcja animująca przesuwanie okna

//wysyłanie maila


window.onload = function () {
	$('html,body').animate({
        scrollLeft: $("#start").offset().left},
		{
		duration: 0,
            specialEasing: {
			width: "easeOutBounce",
			height: "easeOutBounce"
		}});
		$('html,body').animate({
			scrollTop: $("#start").offset().top},
			{
			duration: 0,
				specialEasing: {
				width: "easeOutBounce",
				height: "easeOutBounce"
			}});
	$("#Karuzela .firstPair").toggleClass("active");
}


setInterval(function () {
	$("#Karuzela .secondPair").toggleClass("active");
	$("#Karuzela .firstPair").toggleClass("active");
}, 7000);



//przejście pomiędzy "podstronami"
function SwitchMenu(menuName) {
	if (AnimationInProgress == 0 && currentMenu == null) {
		AnimationInProgress = 1;
		currentMenu = document.getElementById(menuName);
		currentMenu.style.display = "block";
		setTimeout(function () {
			currentMenu.classList.toggle('FadeIn-active')
		}, 20);
		setTimeout(function () {
			AnimationInProgress = 0;
		}, 800);
	}
	if (AnimationInProgress == 0 && currentMenu != document.getElementById(menuName)) {
		AnimationInProgress = 1;
		var end = document.getElementById(menuName);
		currentMenu.classList.toggle('FadeIn-active');
		setTimeout(function () {
			currentMenu.style.display = "none";
			currentMenu = end;
			currentMenu.style.display = "block";
		}, 700);
		setTimeout(function () {
			currentMenu.classList.toggle('FadeIn-active');
			AnimationInProgress = 0;
		}, 800);
	}
}

$("#start").on("mousemove", function (event) {
	$(".firstLayer").css("background-position", event.screenX / 160 + " " + event.screenY / 90);
	$(".thirdLayer").css("background-position", event.screenX / 80 + " " + (event.screenY / 45));
});


		$('.count').each(function () {
			$(this).prop('Counter', 0).animate({
				Counter: $(this).data('filter')
			}, {
					duration: 4000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				});
		});
$('.arrowR, .arrowL,  .button, .clickable, .more').on('click', function () {
	if($('body').width() > 1000)
	{
	$('html,body').animate({
		scrollLeft: $($(this).data('filter')).offset().left
	},
		{
			duration: 1400,
			specialEasing: {
				width: "easeOutBounce",
				height: "easeOutBounce"
			}
		});
	}
	else 
	{
		$('html,body').animate({
			scrollTop: $($(this).data('filter')).offset().top
		},
			{
				duration: 1400,
				specialEasing: {
					width: "easeOutBounce",
					height: "easeOutBounce"
				}
			});
	}
		
	$(".clickable").removeClass('active');
	$(".clickable[data-filter='" + $(this).data('filter') + "']").addClass('active');

});

	

$(".clickable").on("click", function () {
	$(".clickable").removeClass('active');
	$(this).addClass('active');
})


var thirdB = document.getElementById("automat_b");

function UnShow() {
	thirdB.classList.toggle('FadeIn-active');
	setTimeout(function () {

		thirdB.style.display = "none";
	}, 800);
}

function Show() {
	thirdB.style.display = "block";
	setTimeout(function () {
		thirdB.classList.toggle('FadeIn-active');
	}, 100);
}

$('.show').mouseover(function () {
	$("#klient_2 .showContainer").removeClass("showed");
	$(this).parent(".showContainer").addClass("showed");
})

$('.burger, .menuList .clickable').on('click', function()
{
	$('.menuList').toggleClass('active');
});

var mailCorrect = 0;
var phoneCorrect = 0;
$("#phoneContact").on('input', function()
{
	var regex = /[0-9]|\./;
	if( regex.test($(this).val() )) {
		$(this).css('box-shadow', 'none');
		phoneCorrect = 1;
	}
	else 
	{
		phoneCorrect = 0;
		$(this).css('box-shadow', '0 0 2px 2px red');
	}
});

$("#mailContact").on('input', function()
{
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	 if (filter.test($(this).val())) 
	 {
		 $(this).css('box-shadow', 'none');
		 mailCorrect = 1;
	 }
	 else
	{
		mailCorrect = 0;
		$(this).css('box-shadow', '0 0 2px 2px red');
	}
});

function SendMail() {
	if(mailCorrect && phoneCorrect)
	{
		if($('#contentContact').val() == "")
		{
			$('#contentContact').val("Jestem zainteresowany Państwa ofertą, proszę o kontakt.");
		}
		$.ajax({
			method: "POST", url: "/assets/php/sendcontactmail.php", data: {
				result: "404",
				name: document.getElementById("nameContact").value,
				mail: document.getElementById("mailContact").value,
				msg: document.getElementById("contentContact").value
			}, type: "post",
			success: function (output) {
				document.getElementById("contentContact").value = "Wiadomość została wysłana";
			}
		});
	}
}