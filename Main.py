from bs4 import BeautifulSoup
import urllib2
import csv

class Listing:
    tourLink = ''
    address = ''

allListings = {}
relevantKeys = ['Mls#','List', 'Maint', 'Apx Sqft', 'Apx Age', 'Bedrooms', 'Rms', 'Address', 'Exposure', 'Level', 'Washrooms', 'Taxes', 'Prkg Incl', 'Locker','TourLink' ]

def populate_keys():
    for item in items:
        for label in item.find_all('label'):
            key = label.get_text().title().replace(':', '')
            allListings[key] = ''
    allListings['TourLink'] = ''
    allListings['Address'] = ''

def parse_item(item):
    listing = {}
    link = item.find_all('a', attrs={'class': 'tour link'})
    listing['TourLink'] = link[0]['href'] if len(link) > 0 else ''

    boldText = item.find_all('span', attrs={'class': 'value', 'style': "font-weight:bold"})
    try:
        listing['Address'] = boldText[0].get_text() +' '+ boldText[1].get_text()
    except Exception as ex:
        print 'boldText'

    for label in item.find_all('label'):
        key = label.get_text().title().replace(':','')
        if (key in relevantKeys):
            listing[key] = label.findNext('span').get_text()

    return listing

def write_to_file():
    with open('househunting.csv', 'w') as csvfile:
        fieldnames = ['first_name', 'last_name']
        writer = csv.DictWriter(csvfile, fieldnames=relevantKeys)
        writer.writeheader()

        for listing in parsedListings:
            writer.writerow(listing)


url = "http://v3.torontomls.net/Live/Pages/Public/Link.aspx?Key=bae59e678437441cbe23fa07a02a6287&App=TREB"
page = urllib2.urlopen(url)
soup = BeautifulSoup(page, 'html.parser')
items = soup.find_all('div', attrs={'class': 'link-item'})

populate_keys()

parsedListings = []
for item in items:
    parsedListings.append(parse_item(item))

write_to_file()



