const PREAMBLE_HTML = "<div hidden=\"\"><!--$--><!--/$--></div>\n<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-WRJPDJ6\"\nheight=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n<noscript><a href=\"https://www.clickcease.com/\" rel=\"nofollow\"><img src=\"https://monitor.clickcease.com/stats/stats.aspx\" alt=\"ClickCease\"></a></noscript>\n<a class=\"skip-link screen-reader-text\" href=\"#content\">Skip to content</a>";

export default function Preamble() {
  return <div dangerouslySetInnerHTML={{ __html: PREAMBLE_HTML }} />;
}
