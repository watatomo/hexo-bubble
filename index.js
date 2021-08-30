const util = require('hexo-util');
const marked = require('marked');

hexo.extend.filter.register('after_post_render', function(data) {
    data.content =
        util.htmlTag(
            'link',
            {
                rel: 'stylesheet',
                href: `https://cdn.jsdelivr.net/npm/hexo-bubble/src/css/bubble.min.css`
            }) +
        data.content;
    return data;
});

hexo.extend.tag.register('bubble', function(args, content) {
  var charaName = args[0];
  var parsedContent = content.replace(/<thought>/g, "<span class='thought'>").replace(/<\/thought\>/g, "</span>").replace(/<span class='thought'>/g, "\<span class='thought'\>");
  parsedContent = parsedContent.replace(/<spell>/g, "<span class='spell'>").replace(/<\/spell>/g, "</span>").replace(/<span class='spell'>/g, "\<span class='spell'\>").replace(/<\/span>/g, "\<\/span\>").replace(/<hold>/g, "<span class='hold'>").replace(/<\/hold\>/g, "</span>");

  parsedContent = marked(parsedContent);

  if (args[1] === undefined) {
    return `<div character="${charaName}">${parsedContent}</div>`
  } else {
  return `<div character="${charaName}" ${args[1]}>${parsedContent}</div>`};
}, {ends: true});
