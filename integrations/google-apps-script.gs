// Deploy as a web app, execute as your Google account, access: anyone.
// In Apps Script > Project Settings > Script Properties set WEBHOOK_TOKEN and RECIPIENT.
// Keep the token private; use the same value as CONTACT_FORM_WEBHOOK_TOKEN in Vercel.
function doPost(e) {
  var out = function(ok) { return ContentService.createTextOutput(JSON.stringify({ok:ok})).setMimeType(ContentService.MimeType.JSON); };
  try {
    var props = PropertiesService.getScriptProperties();
    var token = props.getProperty('WEBHOOK_TOKEN');
    var recipient = props.getProperty('RECIPIENT');
    var body = JSON.parse(e.postData.contents);
    if (!token || !recipient || body.webhookToken !== token) return out(false);
    var msg = ['Novo pedido de orçamento','Protocolo: '+(body.id||''),'Nome: '+body.name,'E-mail: '+body.email,'Empresa: '+(body.company||''),'WhatsApp: '+(body.phone||''),'Serviço: '+(body.service||''),'Orçamento: '+(body.budget||''),'','Mensagem:',body.message].join('\n');
    MailApp.sendEmail({to:recipient,subject:'Novo pedido de orçamento | Nexworthy',body:msg,replyTo:body.email});
    return out(true);
  } catch (err) { return out(false); }
}
