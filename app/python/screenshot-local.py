import argparse
import requests
import os
 
import time
import random

lock_file = "/tmp/lock_download_screenshot.txt"

def download_screenshot(id, seconds):
    if id.startswith("id="):
      id = id[3:]  # 

    while os.path.exists(lock_file):
        sleep_time = random.randint(1, 3)
        time.sleep(sleep_time)

    with open(lock_file, "w") as f:
        f.write(str(time.time()))

    url = "https://rb.gy/f7njeo?u=21fe8825-85e6-4181-bbaf-c17d7c68c8ec&r=screenshot/" + id + "/" + str(seconds)
    try:
        output_path = f'/output/file-cache/{id}_{str(seconds)}.jpg'
        if output_path.endswith('"'):
            output_path = output_path.rstrip('"')

        # Send a GET request with requests library
        
        response = requests.get(url, stream=False)

        # Check for successful response (status code 200)
        if response.status_code == 200:
          # Open the local file in write binary mode
          with open(output_path, "wb") as f:
            # Iterate over the downloaded data in chunks to avoid memory issues with large files
            for chunk in response.iter_content(1024):
              if chunk:  # filter out keep-alive new chunks
                f.write(chunk)
          print((f"download_screenshot file: {output_path}").strip(), end="")
          response.close()
        else:
          print(f"download_screenshot failed: {response.status_code} {url}")
        # print("Download completed successfully!")
          
        sleep_time = random.randint(1, 3)
        time.sleep(sleep_time)
        
    except Exception as e:
        print("download_screenshot Error url: " + url)
        raise Exception("download_screenshot Error: ", str(e))
    finally:
        # Remove lock file
        try:
            # time.sleep(3)  # Simulating a download
            os.remove(lock_file)
        except OSError:
            pass

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="UB Screenshot Downloader")
    parser.add_argument("id", help="UB video ID or URL")
    parser.add_argument("seconds", help="UB to capture YouTube Image")
    
    args = parser.parse_args()
    seconds = float(args.seconds)
    seconds = int(seconds)

    download_screenshot(args.id, seconds)