function showAlert(message){const box=document.getElementById('alerts');if(!box)return;const div=document.createElement('div');div.className='alert-item';div.innerHTML=message;box.prepend(div);}
