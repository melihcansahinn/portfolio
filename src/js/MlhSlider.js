let projects = [];

function SliderItem(itemId, itemSrc) {
    this.itemId = itemId;
    this.itemSrc = itemSrc;
}

function Slider(sliderId, sliderItems) {
    this.sliderId = sliderId;
    this.sliderItems = sliderItems;
}

$('.project-images').each(function (a, project) {
    let sliderItems = [];
    $(project).find('.item').each(function (b, item) {
        $(item).attr('id', b);
        $(item).attr('slider', a);
        const sliderItem = new SliderItem(b, $(item).find('img').attr('src'));
        sliderItems.push(sliderItem);
    });
    const slider = new Slider(a, sliderItems);
    projects.push(slider);
});
$("#img-js-background").on("click", function () {
    $("#img-js").attr("src", "");
    $("#img-js-main").css({ "display": "none" });
});
$(".item img").on("click", function () {
    let sliderId, itemId, itemSrc;
    itemSrc = $(this).attr('src');
    sliderId = $(this).parent().attr('slider');
    itemId = $(this).parent().attr('id');
    sliderUpdate(sliderId, itemId, itemSrc);
});

$("#slider-prev-button").on("click", function () {
    let sliderId = $(this).attr('slider');
    let itemId = $(this).attr('slide');
    let itemSrc = projects[sliderId].sliderItems[itemId].itemSrc;
    sliderUpdate(sliderId, itemId, itemSrc);
});

$("#slider-next-button").on("click", function () {
    let sliderId = $(this).attr('slider');
    let itemId = $(this).attr('slide');
    let itemSrc = projects[sliderId].sliderItems[itemId].itemSrc;
    sliderUpdate(sliderId, itemId, itemSrc);
});

function sliderUpdate(sliderId, itemId, itemSrc) {
    $("#img-js").attr("src", itemSrc);
    $("#img-js-main").css({ "display": "flex" });
    let slider = projects[sliderId];
    itemId = Number(itemId);
    let sliderItemsLength = slider.sliderItems.length - 1;
    let prevButton = $("#slider-prev-button");
    let nextButton = $("#slider-next-button");
    let next, prev;
    if (itemId == sliderItemsLength) {
        next = 0;
        prev = itemId - 1;
    } else if (itemId == 0) {
        next = itemId + 1;
        prev = sliderItemsLength;
    } else {
        next = itemId + 1;
        prev = itemId - 1;
    }

    prevButton.attr('slide', prev);
    prevButton.attr('slider', slider.sliderId);
    nextButton.attr('slide', next);
    nextButton.attr('slider', slider.sliderId);
}
