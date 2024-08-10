import argparse
import requests
import os
 
def download_screenshot(id, seconds):
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
          print(f"download_screenshot file: {output_path}")
        else:
          print(f"download_screenshot failed: {response.status_code}")
        # print("Download completed successfully!")
        
    except Exception as e:
        print("download_screenshot Error url: " + url)
        raise Exception("download_screenshot Error: ", str(e))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="UB Screenshot Downloader")
    parser.add_argument("id", help="UB video ID or URL")
    parser.add_argument("seconds", help="UB to capture YouTube Image")
    
    args = parser.parse_args()
    seconds = float(args.seconds)
    seconds = int(seconds)

    download_screenshot(args.id, seconds)