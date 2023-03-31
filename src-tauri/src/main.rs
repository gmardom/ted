// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[derive(Debug)]
struct Key {
    key: String,
    down: bool,
    repeat: bool,
}

#[tauri::command]
fn keyboard_event(
    key: &str,
    key_down: bool,
    repeat: bool,
) {
    let key = Key { key: key.to_lowercase(), down: key_down, repeat };
    println!("{key:?}");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![keyboard_event])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
