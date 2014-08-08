db.pages.update({ path: 'about' }, { $push: { content_blocks: { name: 'dual-images', type: 'markdown', content: 'xxxxx', _id: (new ObjectId) }}, $set: { view: 'cms/pages/about' }});
db.pages.update({ path: 'about' }, { $pop: { content_blocks: 1 }});

db.pages.insert({ path: 'sounds/what-size-band-do-i-choose', title: 'What Size Band Do I Choose?', description: '', keywords: '', view: 'cms/pages/default', content_blocks: [{ _id: (new ObjectId), name: 'main', content: '# What Size Band Do I Choose?', type: 'markdown' }], body_class: 'band-size' });

db.pages.update({ path: /sounds\/*/, 'content_blocks.name': 'main' }, { $set: { 'content_blocks.$.class_names': 'photos' }}, { multi: true });
