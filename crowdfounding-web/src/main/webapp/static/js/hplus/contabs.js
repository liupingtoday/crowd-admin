$(function () {
    function f(l) {
        var k = 0;
        $(l).each(function () {
            k += $(this).outerWidth(true)
        });
        return k
    }

    /**
     * 显示切换tab动画
     */
    function g(n) {
        var o = f($(n).prevAll()), q = f($(n).nextAll());
        var l = f($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").outerWidth() < k) {
            p = 0
        } else {
            if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
                if ((k - $(n).next().outerWidth(true)) > q) {
                    p = o;
                    var m = n;
                    while ((p - $(m).outerWidth()) > ($(".page-tabs-content").outerWidth() - k)) {
                        p -= $(m).prev().outerWidth();
                        m = $(m).prev()
                    }
                }
            } else {
                if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
                    p = o - $(n).prev().outerWidth(true)
                }
            }
        }
        $(".page-tabs-content").animate({marginLeft: 0 - p + "px"}, "fast")
    }

    function a() {
        var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
        var l = f($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").width() < k) {
            return false
        } else {
            var m = $(".J_menuTab:first");
            var n = 0;
            while ((n + $(m).outerWidth(true)) <= o) {
                n += $(m).outerWidth(true);
                m = $(m).next()
            }
            n = 0;
            if (f($(m).prevAll()) > k) {
                while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
                    n += $(m).outerWidth(true);
                    m = $(m).prev()
                }
                p = f($(m).prevAll())
            }
        }
        $(".page-tabs-content").animate({marginLeft: 0 - p + "px"}, "fast")
    }

    function b() {
        var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
        var l = f($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").width() < k) {
            return false
        } else {
            var m = $(".J_menuTab:first");
            var n = 0;
            while ((n + $(m).outerWidth(true)) <= o) {
                n += $(m).outerWidth(true);
                m = $(m).next()
            }
            n = 0;
            while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
                n += $(m).outerWidth(true);
                m = $(m).next()
            }
            p = f($(m).prevAll());
            if (p > 0) {
                $(".page-tabs-content").animate({marginLeft: 0 - p + "px"}, "fast")
            }
        }
    }

    $(".J_menuItem").each(function (k) {
        if (!$(this).attr("data-index")) {
            $(this).attr("data-index", k)
        }
    });

    /**
     * 点击左侧菜单，加载右侧tab页
     */
    function c() {
        var o = $(this).attr("href"), m = $(this).data("index"), l = $.trim($(this).text()), k = true;
        var $dataObj = $('a[href$="' + decodeURI(o) + '"]');
        if (!$dataObj.hasClass("noactive")) {
            $('.tab-pane li').removeClass("active");
            $('.nav ul').removeClass("in");
            $dataObj.parents("ul").addClass("in")
            $dataObj.parents("li").addClass("active").siblings().removeClass("active").find('li').removeClass("active");
            $dataObj.parents("ul").css('height', 'auto').height();
            $(".nav ul li, .nav li").removeClass("selected");
            $(this).parent("li").addClass("selected");
        }
        if (o == undefined || $.trim(o).length == 0) {
            return false
        }
        var topWindow = $(window.parent.document);
        $(".J_menuTab", topWindow).each(function () {
            if ($(this).data("id") == o) {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
                    g(this);
                    $(".J_mainContent .J_iframe", topWindow).each(function () {
                        if ($(this).data("id") == o) {
                            $(this).show().siblings(".J_iframe").hide();
                            return false
                        }
                    })
                }
                k = false;
                return false
            }
        });
        if (k) {
            var index = layer.msg('正在加载中，请稍后...', {
                icon: 16,
                shade: 0.1
            });
            var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '">' + l + ' <i class="fa fa-times-circle"></i></a>';
            $(".J_menuTab", topWindow).removeClass("active");
            var n = '<iframe class="J_iframe" name="iframe' + m + '" width="100%" height="100%" src="' + o + '" frameborder="0" data-id="' + o + '" seamless></iframe>';
            $(".J_mainContent", topWindow).find("iframe.J_iframe").hide().parents(".J_mainContent").append(n);
            $('.J_mainContent iframe.J_iframe:visible', topWindow).load(function () {
                layer.close(index);
            });
            $(".J_menuTabs .page-tabs-content", topWindow).append(p);
            g($(".J_menuTab.active", topWindow));
        }
        return false
    }

    /**
     * 点击左侧菜单除触发
     */
    $(".J_menuItem").on("click", c);

    /**
     * 点击导航栏tab关闭按钮触发
     * @returns {boolean}
     */
    function h() {
        var m = $(this).parents(".J_menuTab").data("id");
        var l = $(this).parents(".J_menuTab").width();
        if ($(this).parents(".J_menuTab").hasClass("active")) {
            if ($(this).parents(".J_menuTab").next(".J_menuTab").size()) {
                var k = $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").data("id");
                $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").addClass("active");
                $(".J_mainContent .J_iframe").each(function () {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".J_iframe").hide();
                        return false
                    }
                });
                var n = parseInt($(".page-tabs-content").css("margin-left"));
                if (n < 0) {
                    $(".page-tabs-content").animate({marginLeft: (n + l) + "px"}, "fast")
                }
                $(this).parents(".J_menuTab").remove();
                $(".J_mainContent .J_iframe").each(function () {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false
                    }
                })
            }
            if ($(this).parents(".J_menuTab").prev(".J_menuTab").size()) {
                var k = $(this).parents(".J_menuTab").prev(".J_menuTab:last").data("id");
                $(this).parents(".J_menuTab").prev(".J_menuTab:last").addClass("active");
                $(".J_mainContent .J_iframe").each(function () {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".J_iframe").hide();
                        return false
                    }
                });
                syncMenuTab($(this).parents(".J_menuTab").prev(".J_menuTab:last").data("id"));
                $(this).parents(".J_menuTab").remove();
                $(".J_mainContent .J_iframe").each(function () {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false
                    }
                })
            }
        } else {
            $(this).parents(".J_menuTab").remove();
            $(".J_mainContent .J_iframe").each(function () {
                if ($(this).data("id") == m) {
                    $(this).remove();
                    return false
                }
            });
            g($(".J_menuTab.active"))
        }
        return false
    }

    $(".J_menuTabs").on("click", ".J_menuTab i", h);

    function i() {
        $(".page-tabs-content").children("[data-id]").not(":first").not(".active").each(function () {
            commonCloseMenu.call(this);
        });
        $(".page-tabs-content").css("margin-left", "0")
    }

    $(".J_tabCloseOther").on("click", i);

    function j() {
        g($(".J_menuTab.active"))
    }

    $(".J_tabShowActive").on("click", j);

    function e() {
        if (!$(this).hasClass("active")) {
            var k = $(this).data("id");
            syncMenuTab(k);
            $(".J_mainContent .J_iframe").each(function () {
                if ($(this).data("id") == k) {
                    $(this).show().siblings(".J_iframe").hide();
                    return false
                }
            });
            $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
            g(this)
        }
    }

    function syncMenuTab(dataId) {
        if(isLinkage) {
            var $dataObj = $('a[href$="' + decodeURI(dataId) + '"]');
            if ($dataObj.attr("class") != null && !$dataObj.hasClass("noactive")) {
                $('.nav ul').removeClass("in");
                $dataObj.parents("ul").addClass("in")
                $dataObj.parents("li").addClass("active").siblings().removeClass("active").find('li').removeClass("active");
                $dataObj.parents("ul").css('height', 'auto').height();
                $dataObj.click();
                // 顶部菜单同步处理
                var tabStr = $dataObj.parents(".tab-pane").attr("id");
                if (tabStr != null && tabStr.trim(value) != "") {
                    var sepIndex = tabStr.lastIndexOf('_');
                    var menuId = tabStr.substring(sepIndex + 1, tabStr.length);
                    $("#tab_" + menuId + " a").click();
                }
            }
        }
    }

    $(".J_menuTabs").on("click", ".J_menuTab", e);

    function d() {
        var l = $('.J_iframe[data-id="' + $(this).data("id") + '"]');
        var k = l.attr("src")
    }

    /**
     * 刷新当前tab
     */
    function r() {
        var iframeId = $('.page-tabs .page-tabs-content .active.J_menuTab').data('id');
        $('#content-main iframe').each(function () {
            if ($(this).data('id') == iframeId) {
                var index = layer.load(2);
                $(this).attr('src', iframeId);
                $('.J_mainContent iframe.J_iframe:visible').load(function () {
                    layer.close(index);
                });
                return false;
            }
        })
    }
    $(".J_tabRefresh").on("click", r);


    /**
     * 关闭tab页通用方法
     */
    function commonCloseMenu() {
        $('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
        $(this).remove()
    }

    /**
     * 关闭左侧tab
     */
    function closeLeftMenu() {
        $(".page-tabs-content").children("[data-id].active").prevAll('.J_menuTab').not(':last').each(function () {
            commonCloseMenu.call(this);
        });
        $(".page-tabs-content").css("margin-left", "0")
    }

    $(".J_tabCloseLeft").on("click", closeLeftMenu);

    /**
     * 关闭右侧tab
     */
    function closeRightMenu() {
        $(".page-tabs-content").children("[data-id].active").nextAll('.J_menuTab').each(function () {
            commonCloseMenu.call(this);
        });
        $(".page-tabs-content").css("margin-left", "0")
    }

    $(".J_tabCloseRight").on("click", closeRightMenu);


    $(".J_menuTabs").on("dblclick", ".J_menuTab", d);
    $(".J_tabLeft").on("click", a);
    $(".J_tabRight").on("click", b);
    $(".J_tabCloseActive").on("click", activeTabClose);
    $(".J_tabCloseAll").on("click", function () {
        $(".page-tabs-content").children("[data-id]").not(":first").each(function () {
            commonCloseMenu.call(this);
        });
        $(".page-tabs-content").children("[data-id]:first").each(function () {
            $('.J_iframe[data-id="' + $(this).data("id") + '"]').show();
            $(this).addClass("active")
            syncMenuTab($(this).data('id'));
        });
        $(".page-tabs-content").css("margin-left", "0")
    })
});
