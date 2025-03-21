const back_btn = document.getElementById("back");
if (back_btn) {
    back_btn.onclick = () => {
        window.history.back()
    }
}