chrome.runtime.onMessage.addListener(
	function(request, sender) {

		var query = request.message;

		var imageGenerator = {
		searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
			'method=flickr.photos.search&' +
			'api_key=252086eb6fefd725957d0175ffa3ed32&' +
			'text=' + encodeURIComponent(query) + '&' +
			'safe_search=1&' +
			'content_type=1&' +
			'sort=interestingness-desc&' +
			'per_page=20',

		requestImages: function() {
			var req = new XMLHttpRequest();
			req.open("GET", this.searchOnFlickr_, true);
			req.onload = this.showPhotos_.bind(this);
			req.send(null);
		},

		showPhotos_: function (e) {
			var image = e.target.responseXML.querySelectorAll('photo');
			for (var i = 0; i < image.length; i++) {
				var img = document.createElement('img');
				img.src = this.constructImageURL_(image[i]);
				img.setAttribute('title', image[i].getAttribute('title'));
				$('#myModalBody').append(img);
			}
		},

		constructImageURL_: function (photo) {
			return "http://farm" + photo.getAttribute("farm") +
				".static.flickr.com/" + photo.getAttribute("server") +
				"/" + photo.getAttribute("id") +
				"_" + photo.getAttribute("secret") +
				"_s.jpg";
			}
		};

		$("body").append('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button id="btn-close" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div><div id="myModalBody" class="modal-body"></div></div></div></div>');
		$('#myModalLabel').html(query);

		imageGenerator.requestImages();
		$('#myModal').modal('show');

		$('#btn-close').click(function(){
			$('#myModal').remove();
		});
	}
);