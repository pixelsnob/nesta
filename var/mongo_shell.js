db.pages.update({ path: 'about' }, { $push: { content_blocks: { name: 'dual-images', type: 'markdown', content: 'xxxxx', _id: (new ObjectId) }}, $set: { view: 'cms/pages/about' }});
db.pages.update{ path: 'about' }, { $pop: { content_blocks: 1 }};
