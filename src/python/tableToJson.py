import requests
from bs4 import BeautifulSoup


def scrape_links(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        print(soup)
        links = soup.find_all('table')

        results = []
        for link in links:
            title = link.text
            href = link.get('href')
            results.append({'title': title, 'url': href})

        return results
    else:
        print("Failed to retrieve the page.")


if __name__ == "__main__":
    # Replace with the URL you want to scrape
    target_url = "https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.product:alibaba.new.product.getSchema-1"
    scraped_data = scrape_links(target_url)

    for item in scraped_data:
        print("Title:", item['title'])
        print("URL:", item['url'])
        print("=" * 30)
